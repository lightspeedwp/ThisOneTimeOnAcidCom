/**
 * @fileoverview Button stub (unused – @radix-ui/react-slot import removed
 *               to prevent async_hooks runtime errors via esm.sh)
 */

import * as React from "react";

function Button({ children, ...props }: React.ComponentProps<"button">) {
  return <button {...props}>{children}</button>;
}
const buttonVariants = (_opts?: Record<string, string>) => "";

export { Button, buttonVariants };
