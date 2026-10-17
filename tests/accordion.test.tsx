/**
 * Component unit tests using Node's test runner and a real React DOM root.
 * Prerequisites: the repository's React/tsx dependencies plus jsdom.
 * Intended command once jsdom is available:
 * node --import tsx --test tests/accordion.test.tsx
 *
 * jsdom does not synthesize native Enter/Space button activation or CSS layout;
 * these tests cover the component's own click and keyboard handlers.
 */
import assert from 'node:assert/strict';
import { after, afterEach, before, beforeEach, describe, it } from 'node:test';
import React, { act } from 'react';
import type { Root } from 'react-dom/client';
import { JSDOM } from 'jsdom';
import { Accordion } from '../src/app/components/ui/accordion';

type Props = React.ComponentProps<typeof Accordion>;

const items: Props['items'] = [
  { id: 'first', title: 'First section', content: <p>First body</p> },
  { id: 'second', title: 'Second section', content: <a href="#details">Details</a> },
  { id: 'third', title: 'Third section', content: null },
];

describe('Accordion', { concurrency: false }, function () {
  let dom: JSDOM;
  let container: HTMLDivElement;
  let root: Root;
  let createRoot: typeof import('react-dom/client').createRoot;
  const globals = new Map<string, PropertyDescriptor | undefined>();

  before(async function () {
    dom = new JSDOM('<!doctype html><html><body></body></html>');
    const replacements = {
      window: dom.window,
      document: dom.window.document,
      navigator: dom.window.navigator,
      IS_REACT_ACT_ENVIRONMENT: true,
    };
    Object.entries(replacements).forEach(function ([name, value]) {
      globals.set(name, Object.getOwnPropertyDescriptor(globalThis, name));
      Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    });
    // React DOM detects browser capabilities when imported.
    createRoot = (await import('react-dom/client')).createRoot;
  });

  beforeEach(function () {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(async function () {
    await act(async function () { root.unmount(); });
    container.remove();
  });

  after(function () {
    dom.window.close();
    globals.forEach(function (descriptor, name) {
      if (descriptor) Object.defineProperty(globalThis, name, descriptor);
      else Reflect.deleteProperty(globalThis, name);
    });
  });

  async function render(props: Partial<Props> = {}) {
    await act(async function () { root.render(<Accordion items={items} {...props} />); });
  }

  function triggers(): HTMLButtonElement[] {
    return Array.from(container.querySelectorAll('button'));
  }

  function trigger(title: string): HTMLButtonElement {
    const result = triggers().find(function (button) { return button.textContent === title; });
    assert.ok(result, 'Missing trigger: ' + title);
    return result;
  }

  function panel(button: HTMLButtonElement): HTMLElement {
    const id = button.getAttribute('aria-controls');
    assert.ok(id, 'Trigger must name its panel');
    const result = document.getElementById(id);
    assert.ok(result && container.contains(result), 'Panel must belong to this accordion');
    return result;
  }

  function assertExpanded(expected: string[]) {
    const expanded = triggers().filter(function (button) {
      const open = button.getAttribute('aria-expanded') === 'true';
      assert.equal(panel(button).hidden, !open);
      assert.equal(panel(button).classList.contains('accordion__content--open'), open);
      return open;
    }).map(function (button) { return button.textContent; });
    assert.deepEqual(expanded, expected);
  }

  async function click(title: string) {
    await act(async function () { trigger(title).click(); });
  }

  async function press(button: HTMLButtonElement, key: string) {
    const event = new dom.window.KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
    await act(async function () { button.dispatchEvent(event); });
    return event;
  }

  it('renders every title and links each hidden region to its trigger', async function () {
    await render();
    assert.deepEqual(triggers().map(function (button) { return button.textContent; }),
      ['First section', 'Second section', 'Third section']);
    const ids = new Set<string>();
    triggers().forEach(function (button) {
      assert.equal(button.type, 'button');
      assert.equal(button.getAttribute('aria-expanded'), 'false');
      const region = panel(button);
      assert.equal(region.getAttribute('role'), 'region');
      assert.equal(region.getAttribute('aria-labelledby'), button.id);
      assert.ok(button.querySelector('svg[aria-hidden="true"]'));
      ids.add(button.id);
      ids.add(region.id);
    });
    assert.equal(ids.size, 6);
    assert.equal(panel(trigger('First section')).textContent, 'First body');
    assert.equal(panel(trigger('Second section')).querySelector('a')!.getAttribute('href'), '#details');
    assert.equal(panel(trigger('Third section')).textContent, '');
    assertExpanded([]);
  });

  it('renders an empty list without triggers or regions', async function () {
    await render({ items: [] });
    assert.equal(triggers().length, 0);
    assert.equal(container.querySelectorAll('[role="region"]').length, 0);
  });

  it('opens only the requested initial item and ignores an unknown default ID', async function () {
    await render({ defaultOpen: ['missing', 'second'] });
    assertExpanded(['Second section']);
  });

  it('opens and closes the same item in the default single mode', async function () {
    await render();
    await click('First section');
    assertExpanded(['First section']);
    await click('First section');
    assertExpanded([]);
  });

  it('replaces the open item in explicit single mode', async function () {
    await render({ allowMultiple: false, defaultOpen: ['first'] });
    await click('Second section');
    assertExpanded(['Second section']);
  });

  it('adds and independently closes items in multiple mode', async function () {
    await render({ allowMultiple: true, defaultOpen: ['first', 'third'] });
    assertExpanded(['First section', 'Third section']);
    await click('Second section');
    assertExpanded(['First section', 'Second section', 'Third section']);
    await click('First section');
    assertExpanded(['Second section', 'Third section']);
    await click('Third section');
    assertExpanded(['Second section']);
  });

  it('does not mutate the caller defaultOpen array while toggling', async function () {
    const defaultOpen = ['first'];
    Object.freeze(defaultOpen);
    await render({ allowMultiple: true, defaultOpen });
    await click('Second section');
    await click('First section');
    assertExpanded(['Second section']);
    assert.deepEqual(defaultOpen, ['first']);
  });

  it('removes duplicate default IDs when their item is closed', async function () {
    await render({ allowMultiple: true, defaultOpen: ['first', 'first', 'second'] });
    await click('First section');
    assertExpanded(['Second section']);
  });

  it('uses defaultOpen only to initialize state', async function () {
    await render({ defaultOpen: ['first'] });
    await click('Second section');
    await render({ defaultOpen: ['third'] });
    assertExpanded(['Second section']);
  });

  it('uses the latest allowMultiple value after rerendering', async function () {
    await render({ defaultOpen: ['first'] });
    await render({ allowMultiple: true });
    await click('Second section');
    assertExpanded(['First section', 'Second section']);
    await render({ allowMultiple: false });
    await click('Third section');
    assertExpanded(['Third section']);
  });

  it('applies every queued toggle using the latest state', async function () {
    await render({ allowMultiple: true });
    await act(async function () {
      trigger('First section').click();
      trigger('Second section').click();
      trigger('First section').click();
    });
    assertExpanded(['Second section']);
  });

  const navigation = [
    { key: 'ArrowDown', start: 'First section', end: 'Second section' },
    { key: 'ArrowDown', start: 'Third section', end: 'First section' },
    { key: 'ArrowUp', start: 'Second section', end: 'First section' },
    { key: 'ArrowUp', start: 'First section', end: 'Third section' },
    { key: 'Home', start: 'Second section', end: 'First section' },
    { key: 'End', start: 'Second section', end: 'Third section' },
  ];
  navigation.forEach(function ({ key, start, end }) {
    it(key + ' moves focus from ' + start + ' to ' + end + ' without toggling', async function () {
      await render({ defaultOpen: ['second'] });
      const button = trigger(start);
      button.focus();
      const event = await press(button, key);
      assert.equal(event.defaultPrevented, true);
      assert.equal(document.activeElement, trigger(end));
      assertExpanded(['Second section']);
    });
  });

  ['ArrowDown', 'ArrowUp', 'Home', 'End'].forEach(function (key) {
    it(key + ' keeps focus on the only item', async function () {
      await render({ items: items.slice(0, 1) });
      const button = trigger('First section');
      button.focus();
      const event = await press(button, key);
      assert.equal(event.defaultPrevented, true);
      assert.equal(document.activeElement, button);
      assertExpanded([]);
    });
  });

  ['Tab', 'Escape', 'ArrowLeft', 'a', 'Enter', ' '].forEach(function (key) {
    it('leaves ' + JSON.stringify(key) + ' to native button behavior', async function () {
      await render();
      const button = trigger('Second section');
      button.focus();
      const event = await press(button, key);
      assert.equal(event.defaultPrevented, false);
      assert.equal(document.activeElement, button);
      assertExpanded([]);
    });
  });

  it('uses the current order for focus and item IDs for state after a reorder', async function () {
    await render({ defaultOpen: ['second'] });
    await render({ items: [items[2], items[0], items[1]] });
    assertExpanded(['Second section']);
    trigger('Third section').focus();
    await press(trigger('Third section'), 'ArrowDown');
    assert.equal(document.activeElement, trigger('First section'));
  });

  it('updates keyboard bounds when items are removed and then added', async function () {
    await render();
    await render({ items: items.slice(0, 2) });
    trigger('Second section').focus();
    await press(trigger('Second section'), 'ArrowDown');
    assert.equal(document.activeElement, trigger('First section'));
    await render();
    await press(trigger('First section'), 'End');
    assert.equal(document.activeElement, trigger('Third section'));
  });
});
