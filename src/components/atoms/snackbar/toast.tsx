import {
  CheckCircle,
  CloseCircle,
  DangerTriangle,
  InfoCircle,
} from "@solar-icons/react-perf/Linear";
import { CloseIcon } from "@/components/icons/custom";
import {
  useCallback,
  useEffect,
  useState,
  type ComponentType,
  type SVGProps,
} from "react";
import { cn } from "@/lib/utils";
import type { ToastProps, ToastVariant } from "./types";
import { getToastContainerClasses, getToastTitleClasses } from "./variants";

const DEFAULT_ICONS: Record<
  ToastVariant,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  success: CheckCircle,
  destructive: CloseCircle,
  warning: DangerTriangle,
  info: InfoCircle,
  promises: InfoCircle,
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
          "size-16 shrink-0 md:size-20",
          getToastTitleClasses(variant)
        )}
        aria-hidden
      />
    ) : null);

  return (
    <div
      className={cn(
        "rounded-12 border-grey-400 shadow-secondary fixed z-50 flex w-[calc(100%-32px)] flex-col gap-12 border p-12 transition-all duration-300 ease-in-out md:max-w-[343px] md:max-w-[440px] md:flex-row md:items-center md:p-16",
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
              "text-body-2 font-semibold",
              getToastTitleClasses(variant)
            )}
          >
            {title}
          </p>
          {body ? <p className="text-body-3 text-grey-700">{body}</p> : null}
        </div>

        {action ? (
          <div className="hidden shrink-0 md:block">{action}</div>
        ) : null}

        {showClose ? (
          <button
            type="button"
            onClick={handleClose}
            className="text-grey-800 shrink-0 rounded-full bg-transparent p-4"
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
