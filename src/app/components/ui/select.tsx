/**
 * @fileoverview Select stub (unused – @radix-ui/react-select import removed
 *               to prevent async_hooks runtime errors via esm.sh)
 */

import * as React from "react";

function noop({ children }: { children?: React.ReactNode }) { return <span>{children}</span>; }

var Select = noop;
var SelectGroup = noop;
var SelectValue = noop;
var SelectTrigger = noop;
var SelectContent = noop;
var SelectLabel = noop;
var SelectItem = noop;
var SelectSeparator = function() { return null; };

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};