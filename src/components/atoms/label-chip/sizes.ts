import type { LabelChipSize } from "./types";

export const LABEL_CHIP_BASE_CLASSES =
  "flex items-center gap-4 rounded-8 font-medium w-fit";

export const LABEL_CHIP_SIZE_CLASSES: Record<LabelChipSize, string> = {
  s: "h-24 px-8 text-xs",
  m: "h-32 px-12 text-sm",
  l: "h-40 px-12 text-md",
};
