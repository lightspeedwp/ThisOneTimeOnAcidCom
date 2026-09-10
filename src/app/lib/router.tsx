export { useNavigate, useLocation, useParams, useSearchParams, Link, Outlet, NavLink, Navigate, useMatch } from 'react-router';

export function grab(obj: any, key: string) {
  if (obj == null) return undefined;
  var entries = Object.entries(obj);
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    if (entry[0] === key) {
      return entry[1];
    }
  }
  return undefined;
}

export function setProp(obj: any, key: string, value: any) {
  if (obj == null) return;
  Object.defineProperty(obj, key, { value: value, enumerable: true, writable: true, configurable: true });
}

export function arrayGet(arr: any[], index: number) {
  if (arr == null || !Array.isArray(arr)) return undefined;
  if (index < 0 || index >= arr.length) return undefined;
  return arr[index];
}
