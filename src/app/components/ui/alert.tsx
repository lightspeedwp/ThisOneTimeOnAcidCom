/**
 * @fileoverview Alert stub (unused – class-variance-authority import removed
 *               to prevent async_hooks runtime errors via esm.sh)
 */
import * as React from "react";

function Alert({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={className}
      {...props}
    />
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={className}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={className}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
