import React from "react";
import { cn } from "@/lib/utils";
import {
  ICON_BUTTON_ICON_SIZE_CLASSES,
  ICON_BUTTON_SIZE_CLASSES,
} from "./sizes";
import type { ButtonColor, ButtonSize, ButtonVariant } from "./types";
import { BUTTON_BASE_CLASSES, getButtonVariantClasses } from "./variants";

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled"> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  disabled?: boolean;
  icon: React.ReactNode;
  "aria-label": string;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "primary",
      color = "primary",
      size = "m",
      disabled = false,
      icon,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          BUTTON_BASE_CLASSES,
          ICON_BUTTON_SIZE_CLASSES[size],
          "shrink-0 p-0",
          getButtonVariantClasses(variant, color, disabled),
          className
        )}
        disabled={!!disabled}
        ref={ref}
        type={type}
        {...props}
      >
        <span
          className={cn(
            "inline-flex items-center justify-center [&_svg]:size-full",
            ICON_BUTTON_ICON_SIZE_CLASSES[size]
          )}
        >
          {icon}
        </span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };
export type { IconButtonProps };
