import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/atoms";
import { cn } from "@/lib/utils";
import type { ModalProps } from "./types";
import { MODAL_SIZE_CLASSES } from "./sizes";

export function Modal({
  isOpen,
  onClose,
  children,
  size = "m",
  actionLayout = "row",
  className,
  title,
  actions = [],
  contentClassName,
  contentStyle,
}: ModalProps) {
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className={cn("fixed inset-0 z-50 bg-grey-900/50", className)}
        />
        <Dialog.Content
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-16 bg-white shadow-secondary focus:outline-none",
            MODAL_SIZE_CLASSES[size]
          )}
        >
          <div
            className={cn("flex-1 overflow-y-auto p-24", contentClassName)}
            style={contentStyle}
          >
            <Dialog.Title
              className={cn(
                "mb-16 w-full text-center text-body-1 font-semibold text-grey-900",
                !title && "sr-only"
              )}
            >
              {title || "Dialog"}
            </Dialog.Title>
            {children}
          </div>

          {actions.length > 0 && (
            <div className="shrink-0 border-t border-grey-400 bg-white px-24 py-16">
              <div
                className={cn(
                  "flex gap-8",
                  actionLayout === "row" ? "flex-row" : "flex-col"
                )}
              >
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    {...action}
                    className={cn(
                      actionLayout === "row" ? "min-w-0 flex-1" : "w-full",
                      action.className
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
