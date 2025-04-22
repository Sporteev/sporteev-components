import { cva, type VariantProps } from "class-variance-authority";
import { type ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LogoFlat } from "@/components/icons";

const snackbarVariants = cva(
  "fixed flex items-start gap-3 rounded-lg px-4 py-3 shadow-lg transition-all duration-300 ease-in-out md:bottom-4 md:right-4 md:left-auto md:top-auto md:translate-x-0 md:w-auto md:max-w-md w-[calc(100%-2rem)] top-4 left-4 -translate-y-full data-[state=open]:translate-y-0 md:p-4 p-3",
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
  onClose?: () => void;
}

const Snackbar = ({
  title,
  body,
  variant = "primary",
  action,
  duration = 3000,
  onClose,
}: SnackbarProps) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={cn(snackbarVariants({ variant }))} data-state="open">
      <div className="flex flex-grow items-center gap-2 md:w-[30vw]">
        <LogoFlat size={40} />
        <div className="flex w-full flex-col">
          <h3 className="font-medium">{title}</h3>
          {body && <p className="text-sm opacity-90">{body}</p>}
        </div>
      </div>
      {action && <div className="ml-auto shrink-0">{action}</div>}
    </div>
  );
};

export { Snackbar };
export type { SnackbarProps };
export { useSnackbar } from "./useSnackbar";
