import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn cursor-pointer flex items-center justify-center gap-8 font-medium rounded-full focus:outline-none transition-all duration-150 ease-in-out active:scale-110",
  {
    defaultVariants: {
      variant: "primary",
      size: "medium",
      danger: false,
    },
    variants: {
      variant: {
        primary: "bg-primary-600 text-grey-100 hover:bg-primary-700",
        secondary: "bg-primary-200 text-primary-600 hover:bg-primary-300",
        outline:
          "border-2 border-primary-600 text-primary-600 bg-white hover:bg-primary-600 hover:text-grey-200",
        ghost: "bg-primary-100 text-primary-600 hover:bg-primary-200",
      },
      size: {
        large: "px-32 h-48 text-lg font-semibold",
        medium: "px-24 h-40 text-md font-semibold",
        small: "px-16 h-32 text-xs font-semibold",
      },
      danger: {
        true: "",
        false: "",
      },
      disabled: {
        true: "",
        false: "",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      // danger overrides styles
      {
        variant: "primary",
        danger: true,
        className: "bg-danger-main text-grey-100 hover:bg-danger-main-hover",
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
          "border-2 border-danger-main text-danger-main hover:bg-danger-main hover:text-grey-200",
      },
      {
        variant: "ghost",
        danger: true,
        className:
          "bg-grey-100 text-danger-main hover:bg-danger-main-hover hover:text-grey-200",
      },
      // disabled overrides styles
      {
        variant: "primary",
        disabled: true,
        className: "bg-grey-400 text-grey-500 pointer-events-none",
      },
      {
        variant: "secondary",
        disabled: true,
        className: "bg-grey-300 text-grey-600 pointer-events-none",
      },
      {
        variant: "outline",
        disabled: true,
        className: "border-2 border-grey-500 text-grey-500 pointer-events-none",
      },
      {
        variant: "ghost",
        disabled: true,
        className: "bg-grey-200 text-grey-700 pointer-events-none",
      },
    ],
  }
);

interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "medium",
      danger = false,
      disabled = false,
      fullWidth = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 150);

      onClick?.(e);
    };

    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            danger,
            disabled,
            className,
            fullWidth,
          }),
          isClicked && "scale-105"
        )}
        disabled={!!disabled}
        ref={ref}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
