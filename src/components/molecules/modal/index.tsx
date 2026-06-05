import React, { ReactNode, useCallback, useRef, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/atoms";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-16",
  {
    variants: {
      size: {
        small:
          "[&>div]:w-full [&>div]:max-w-sm [&>div]:md:min-w-320 [&>div]:max-h-[50vh]",
        medium:
          "[&>div]:w-full [&>div]:max-w-md [&>div]:md:min-w-[512px] [&>div]:max-h-[70vh]",
        large:
          "[&>div]:w-full [&>div]:max-w-4xl [&>div]:md:min-w-[768px] [&>div]:max-h-[90vh]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

type ModalAction = Pick<
  ButtonProps,
  "children" | "onClick" | "variant" | "disabled" | "danger" | "className"
>;

export interface ModalProps extends VariantProps<typeof modalVariants> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  title?: string;
  actions?: ModalAction[];
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "medium",
  className,
  title,
  actions = [],
  contentClassName,
  contentStyle,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      // Check if the click was outside the modal content
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, handleOutsideClick]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn(modalVariants({ size }), className)}>
      <div
        ref={modalRef}
        className="rounded-16 relative mx-auto flex flex-col bg-white shadow-secondary"
      >
        <div
          className={cn("flex-1 overflow-y-auto p-24", contentClassName)}
          style={contentStyle}
        >
          {title && (
            <h2 className="text-grey-900 mt-0 mb-16 w-full text-center text-xl font-semibold">
              {title}
            </h2>
          )}
          {children}
        </div>

        {actions.length > 0 && (
          <div className="border-grey-200 bg-grey-100 rounded-b-16 flex-shrink-0 border-t px-24 py-16">
            <div
              className={cn(
                "grid gap-12",
                actions.length === 1 ? "grid-cols-1" : "grid-cols-2",
                actions.length > 2 && "grid-cols-3"
              )}
            >
              {actions.map((action, index) => (
                <Button
                  key={index}
                  {...action}
                  className={cn("w-full", action.className)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { Modal };
