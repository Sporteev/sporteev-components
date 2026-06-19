import React from "react";
import { cn } from "@/lib/utils";
import {
  TEXT_BUTTON_ICON_SIZE_CLASSES,
  TEXT_BUTTON_SIZE_CLASSES,
} from "./sizes";
import type { ButtonProps } from "./types";
import { BUTTON_BASE_CLASSES, getButtonVariantClasses } from "./variants";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      color = "primary",
      size = "m",
      disabled = false,
      fullWidth = false,
      startIcon,
      endIcon,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    const iconSizeClass = TEXT_BUTTON_ICON_SIZE_CLASSES[size];

    return (
      <button
        className={cn(
          BUTTON_BASE_CLASSES,
          TEXT_BUTTON_SIZE_CLASSES[size],
          getButtonVariantClasses(variant, color, disabled),
          fullWidth && "w-full",
          className
        )}
        disabled={!!disabled}
        ref={ref}
        type={type}
        {...props}
      >
        {startIcon ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center [&_svg]:size-full",
              iconSizeClass
            )}
          >
            {startIcon}
          </span>
        ) : null}
        {children}
        {endIcon ? (
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center [&_svg]:size-full",
              iconSizeClass
            )}
          >
            {endIcon}
          </span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
