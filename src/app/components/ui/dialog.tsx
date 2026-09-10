/**
 * @fileoverview Dialog stub (unused – @radix-ui/react-dialog import removed
 *               to prevent async_hooks runtime errors via esm.sh)
 */

import * as React from "react";

function noop({ children }: { children?: React.ReactNode }) { return <span>{children}</span>; }
function noopVoid() { return null; }

var Dialog = noop;
var DialogClose = noop;
var DialogContent = noop;
var DialogDescription = noop;
var DialogFooter = noop;
var DialogHeader = noop;
var DialogOverlay = noopVoid;
var DialogPortal = noop;
var DialogTitle = noop;
var DialogTrigger = noop;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};