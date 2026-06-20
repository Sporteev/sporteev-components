import type { FieldSize } from "../input-text/types";

export { INPUT_FIELD_SIZE_CLASSES as SCORE_BOX_SIZE_CLASSES } from "../input-text/sizes";

export const SCORE_BOX_WIDTH_CLASSES: Record<FieldSize, string> = {
  s: "w-36",
  m: "w-48",
  l: "w-56",
  xl: "w-72",
};

/** Field size → icon button size (same for `s`, one step smaller for m/l/xl) */
export const SCORE_BUTTON_SIZE_MAP: Record<FieldSize, FieldSize> = {
  s: "s",
  m: "s",
  l: "m",
  xl: "l",
};

export const SCORE_ROW_GAP_CLASSES: Record<FieldSize, string> = {
  s: "gap-4",
  m: "gap-8",
  l: "gap-10",
  xl: "gap-12",
};
