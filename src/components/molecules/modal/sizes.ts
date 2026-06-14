import type { ModalSize } from "./types";

export const MODAL_SIZE_CLASSES: Record<ModalSize, string> = {
  s: "max-w-sm md:min-w-320 max-h-[50vh]",
  m: "max-w-md md:min-w-[512px] max-h-[70vh]",
  l: "max-w-4xl md:min-w-[768px] max-h-[90vh]",
};
