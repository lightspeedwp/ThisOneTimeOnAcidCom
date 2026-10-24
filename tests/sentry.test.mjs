import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { transformSync } from '@swc/core';
import { resolveConfig } from 'vite';

const require = createRequire(import.meta.url);
const react = require('react');
const reactRouter = require('react-router');

function loadModule(path, mocks) {
  const code = transformSync(readFileSync(new URL(path, import.meta.url), 'utf8'), {
    filename: path,
    jsc: { parser: { syntax: 'typescript', tsx: true }, transform: { react: { runtime: 'automatic' } } },
    module: { type: 'commonjs' },
  }).code;
  const exports = {};
  runInNewContext(code, {
    exports,
    require(id) { return Object.hasOwn(mocks, id) ? mocks[id] : require(id); },
    console: mocks.console || console,
  });
  return exports;
}

test('build configuration preserves DSN, mode, sampling and disabled behavior', async function (t) {
  const originalEnv = { ...process.env };
  t.after(function () { process.env = originalEnv; });
  process.env.SENTRY_AUTH_TOKEN = '';
  process.env.SENTRY_ORG = '';
  process.env.SENTRY_PROJECT = '';
  for (const scenario of [
    { nodeEnv: 'production', mode: 'production', dsn: 'https://public@example.test/1', rate: 0.2 },
    { nodeEnv: 'production', mode: 'staging', dsn: 'https://public@example.test/1', rate: 0.2 },
    { nodeEnv: 'development', mode: 'production', dsn: 'https://public@example.test/1', rate: 1.0 },
    { nodeEnv: 'development', mode: 'development', dsn: '', rate: 1.0 },
    { nodeEnv: 'production', mode: 'production', dsn: '', rate: 0.2 },
  ]) {
    process.env.NODE_ENV = scenario.nodeEnv;
    process.env.VITE_SENTRY_DSN = scenario.dsn;
    const config = await resolveConfig({ logLevel: 'silent' }, 'build', scenario.mode);
    const plugin = config.plugins.find(function (plugin) { return plugin.name === 'sentry-client-config'; });
    const virtualId = plugin.resolveId('virtual:sentry-config');
    const generated = plugin.load(virtualId);
    assert.doesNotMatch(generated, /SENTRY_AUTH_TOKEN|SENTRY_ORG|SENTRY_PROJECT/);
    const sentryConfig = runInNewContext(generated.replace('export var', 'var') + '; sentryConfig');
    assert.equal(sentryConfig.environment, scenario.mode);
    assert.equal(sentryConfig.tracesSampleRate, scenario.rate);
    assert.equal(sentryConfig.development, scenario.nodeEnv !== 'production');

    let init;
    let hooks;
    let replay;
    const warnings = [];
    loadModule('../src/instrument.ts', {
      'virtual:sentry-config': { sentryConfig },
      '@sentry/react': {
        init(options) { init = options; },
        reactRouterV7BrowserTracingIntegration(options) { hooks = options; return { name: 'router-tracing' }; },
        replayIntegration(options) { replay = options; return { name: 'replay' }; },
      },
      console: { warn(message) { warnings.push(message); } },
    });
    if (scenario.dsn) {
      assert.equal(init.dsn, scenario.dsn);
      assert.equal(init.environment, scenario.mode);
      assert.equal(init.tracesSampleRate, scenario.rate);
      assert.equal(init.replaysSessionSampleRate, 0.1);
      assert.equal(init.replaysOnErrorSampleRate, 1.0);
      assert.equal(replay.maskAllText, true);
      assert.equal(replay.blockAllMedia, true);
      assert.equal(hooks.useEffect, react.useEffect);
      for (const hook of ['useLocation', 'useNavigationType', 'createRoutesFromChildren', 'matchRoutes']) {
        assert.equal(hooks[hook], reactRouter[hook]);
      }
      assert.equal(warnings.length, 0);
    } else {
      assert.equal(init, undefined);
      assert.equal(warnings.length, scenario.nodeEnv === 'production' ? 0 : 1);
    }
  }
});

test('RouterProvider reports the original handled error to Sentry without changing its fallback', function () {
  const captured = [];
  const router = {};
  const App = loadModule('../src/app/App.tsx', {
    './routes': { router },
    '@sentry/react': { captureException(error) { captured.push(error); } },
  }).default;
  const provider = App();
  const error = new Error('route render failed');
  assert.equal(provider.type, reactRouter.RouterProvider);
  assert.equal(provider.props.router, router);
  provider.props.onError(error);
  assert.deepEqual(captured, [error]);
  assert.equal(provider.props.fallback, undefined);
});
