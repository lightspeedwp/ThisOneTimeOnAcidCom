/**
 * @fileoverview SafetyWrapper component for Ash Shaw Makeup Portfolio
 *
 * Thin wrapper that renders a div with the safety-wrapper class around its
 * children. It is not an error boundary and does not catch render errors.
 *
 * @author Ash Shaw Portfolio Team
 * @version 1.0.0
 */

import React from 'react';

interface SafetyWrapperProps {
  children: React.ReactNode;
  /** Enable debug logging (only in DEV) */
  debug?: boolean;
}

/**
 * SafetyWrapper - Lightweight wrapper for compatibility with the nested
 * bootstrap. It renders children unchanged and does not isolate errors.
 */
export function SafetyWrapper(props: SafetyWrapperProps) {
  var children = props.children;
  return React.createElement("div", { className: "safety-wrapper" }, children);
}
