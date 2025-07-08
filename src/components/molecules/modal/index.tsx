import React, { ReactNode, useCallback, useRef, useEffect } from "react";
import { Button, type ButtonProps } from "@/components/atoms";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
  {
    variants: {
      size: {
        small: "[&>div]:max-w-sm [&>div]:min-w-[20rem]", // min-w-80
        medium: "[&>div]:max-w-md [&>div]:min-w-[28rem]", // min-w-112
        large: "[&>div]:max-w-4xl [&>div]:min-w-[48rem]", // min-w-192
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
        className="relative mx-auto overflow-hidden rounded-2xl bg-white"
      >
        <div className={cn("p-6", contentClassName)}>
          {title && (
            <h2 className="mb-4 mt-0 w-full text-center text-xl font-semibold text-neutral-90">
              {title}
            </h2>
          )}
          {children}
        </div>

        {actions.length > 0 && (
          <div className="border-t border-neutral-20 bg-neutral-10 px-6 py-4">
            <div
              className={cn(
                "grid gap-3",
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
