"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-10 w-full rounded-md border border-yellow-400/20 bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-yellow-400/50 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-yellow-400",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export { Select }; 