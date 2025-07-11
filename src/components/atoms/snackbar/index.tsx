import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { LogoFlat } from "@/components/icons";

const snackbarVariants = cva(
  [
    "fixed flex flex-col items-start gap-3 rounded-lg shadow-lg",
    "transition-all duration-300 ease-in-out",
    "md:bottom-4 md:left-4 md:right-auto md:top-auto",
    "md:w-auto md:max-w-[40%]",
    "w-[calc(100%-2rem-1.5rem)] max-w-full",
    "top-4 left-4 p-3",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-primary-20 text-primary-80",
        tertiary: "bg-tertiary-30 text-tertiary-70",
        success: "bg-success-accent text-success-main",
        warning: "bg-warning-accent text-warning-main",
        danger: "bg-danger-accent text-danger-main",
        gray: "bg-neutral-40 text-neutral-80",
        dark: "bg-neutral-70 text-neutral-30",
        light: "bg-neutral-10 text-neutral-70",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

interface SnackbarProps extends VariantProps<typeof snackbarVariants> {
  title: string;
  body?: string;
  action?: ReactNode;
  duration?: number;
  onClose: () => void;
  icon?: ReactNode;
}

const Snackbar = ({
  title,
  body,
  variant = "primary",
  action,
  duration = 3000,
  onClose,
  icon,
}: SnackbarProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    // Slide in animation
    const slideInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Auto close timer
    if (duration && onClose) {
      const closeTimer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => {
        clearTimeout(slideInTimer);
        clearTimeout(closeTimer);
      };
    }

    return () => clearTimeout(slideInTimer);
  }, [duration, handleClose, onClose]);

  return (
    <div
      className={cn(
        snackbarVariants({ variant }),
        // Slide animations - horizontal for both mobile and desktop
        isVisible && !isClosing ? "translate-x-0" : "-translate-x-full"
      )}
      data-state={isVisible && !isClosing ? "open" : "closed"}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 rounded-full bg-transparent p-1 text-inherit"
        aria-label="Close snackbar"
        tabIndex={-1}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "inherit" }}
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <div className="flex flex-grow items-center gap-2 md:w-[30vw]">
        {icon || <LogoFlat size={32} />}
        <div className="flex w-full flex-col gap-2">
          <h4 className="font-semibold">{title}</h4>
          {body && <p className="text-sm opacity-90">{body}</p>}
          {action && <div className="">{action}</div>}
        </div>
      </div>
    </div>
  );
};

export { Snackbar };
export type { SnackbarProps };
export { useSnackbar } from "./useSnackbar";
