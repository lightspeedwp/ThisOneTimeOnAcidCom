/**
 * Node.js ESM loader hook — intercepts `figma:asset/` imports
 * and returns an empty-string default export.
 * Usage: node --import ./scripts/figma-asset-register.mjs
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('figma:asset/') || specifier.startsWith('figma:')) {
    return { shortCircuit: true, url: `data:text/javascript,export default "";` };
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.startsWith('data:text/javascript,')) {
    const source = decodeURIComponent(url.slice('data:text/javascript,'.length));
    return { format: 'module', shortCircuit: true, source };
  }
  return nextLoad(url, context);
}
