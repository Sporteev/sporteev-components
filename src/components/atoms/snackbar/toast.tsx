import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { CloseIcon } from "@/components/icons/custom";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ToastProps, ToastVariant } from "./types";
import {
  getToastContainerClasses,
  getToastIconClasses,
  getToastTitleClasses,
} from "./variants";

const DEFAULT_ICONS: Record<ToastVariant, LucideIcon> = {
  success: CheckCircle,
  destructive: XCircle,
  warning: AlertCircle,
  info: Info,
  promises: Info,
};

export function Toast({
  title,
  body,
  variant = "info",
  action,
  duration = 3000,
  onClose,
  icon,
  showIcon = true,
  showClose = true,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    const slideInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    if (duration) {
      const closeTimer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => {
        clearTimeout(slideInTimer);
        clearTimeout(closeTimer);
      };
    }

    return () => clearTimeout(slideInTimer);
  }, [duration, handleClose]);

  const DefaultIcon = DEFAULT_ICONS[variant];
  const iconNode =
    icon ??
    (showIcon ? (
      <DefaultIcon
        className={cn(
          "shrink-0 size-16 md:size-20",
          getToastIconClasses(variant)
        )}
        aria-hidden
      />
    ) : null);

  return (
    <div
      className={cn(
        "fixed z-50 flex w-[calc(100%-32px)] max-w-[343px] flex-col gap-12 rounded-12 border border-grey-400 p-12 shadow-secondary transition-all duration-300 ease-in-out md:max-w-[440px] md:flex-row md:items-center md:p-16",
        "top-16 left-16 md:top-auto md:right-auto md:bottom-16",
        getToastContainerClasses(variant),
        isVisible && !isClosing ? "translate-x-0" : "-translate-x-full"
      )}
      data-state={isVisible && !isClosing ? "open" : "closed"}
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full min-w-0 items-center gap-8 md:flex-1 md:gap-12">
        {iconNode}

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <p
            className={cn(
              "text-body-3 font-semibold md:text-body-2",
              getToastTitleClasses(variant)
            )}
          >
            {title}
          </p>
          {body ? (
            <p className="text-caption-1 text-grey-700 md:text-body-3">
              {body}
            </p>
          ) : null}
        </div>

        {action ? (
          <div className="hidden shrink-0 md:block">{action}</div>
        ) : null}

        {showClose ? (
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-full bg-transparent p-4 text-grey-800"
            aria-label="Close toast"
          >
            <span className="block size-16 md:size-20">
              <CloseIcon className="h-full w-full" aria-hidden />
            </span>
          </button>
        ) : null}
      </div>

      {action ? <div className="w-full md:hidden">{action}</div> : null}
    </div>
  );
}
