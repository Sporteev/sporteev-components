import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 font-medium rounded-full focus:outline-none focus:ring-2 transition-all",
  {
    variants: {
      defaultVariants: {
        variant: "primary",
        size: "medium",
        danger: false,
      },
      variant: {
        primary: "bg-primary-80 text-neutral-10 hover:bg-primary-90",
        secondary: "bg-primary-20 text-primary-80 hover:bg-primary-30",
        outline:
          "border-2 border-primary-80 text-primary-80 hover:bg-primary-80 hover:text-neutral-20",
        ghost: "bg-primary-10 text-primary-80 hover:bg-primary-20",
      },
      size: {
        large: "px-8 py-3 text-lg",
        medium: "px-6 py-2 text-md",
        small: "px-4 py-1 text-sm",
      },
      danger: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // danger overrides styles
      {
        variant: "primary",
        danger: true,
        className: "bg-danger-main text-neutral-10 hover:bg-danger-main-hover",
      },
      {
        variant: "secondary",
        danger: true,
        className:
          "bg-danger-accent text-danger-main hover:bg-danger-accent-hover",
      },
      {
        variant: "outline",
        danger: true,
        className:
          "border-2 border-danger-main text-danger-main hover:bg-danger-main hover:text-neutral-20",
      },
      {
        variant: "ghost",
        danger: true,
        className:
          "bg-neutral-10 text-danger-main hover:bg-danger-main-hover hover:text-neutral-20",
      },
      // disabled overrides styles
      {
        variant: "primary",
        disabled: true,
        className: "bg-neutral-40 text-neutral-50 pointer-events-none",
      },
      {
        variant: "secondary",
        disabled: true,
        className: "bg-neutral-30 text-neutral-60 pointer-events-none",
      },
      {
        variant: "outline",
        disabled: true,
        className:
          "border-2 border-neutral-50 text-neutral-50 pointer-events-none",
      },
      {
        variant: "ghost",
        disabled: true,
        className: "bg-neutral-20 text-neutral-70 pointer-events-none",
      },
    ],
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, danger, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, danger, disabled, className })
        )}
        disabled={!!disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
