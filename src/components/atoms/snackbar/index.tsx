import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { LogoFlat } from "@/components/icons";

const snackbarVariants = cva(
  [
    "fixed flex flex-col items-start gap-12 rounded-8 shadow-main z-50",
    "transition-all duration-300 ease-in-out",
    "md:bottom-16 md:left-16 md:right-auto md:top-auto",
    "md:w-auto md:max-w-[40%]",
    "w-[calc(100%-56px)] max-w-full",
    "top-16 left-16 p-12",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-primary-200 text-primary-600",
        tertiary: "bg-tertiary-300 text-tertiary-700",
        success: "bg-success-accent text-success-main",
        warning: "bg-warning-accent text-warning-main",
        danger: "bg-danger-accent text-danger-main",
        gray: "bg-grey-400 text-grey-800",
        dark: "bg-grey-700 text-grey-300",
        light: "bg-grey-100 text-grey-700",
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
        className="absolute top-8 right-8 rounded-full bg-transparent p-4 text-inherit"
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

      <div className="flex flex-grow items-center gap-8 md:w-[30vw]">
        {icon || <LogoFlat size={32} />}
        <div className="flex w-full flex-col gap-8">
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
