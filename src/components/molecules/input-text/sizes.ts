import type { FieldSize } from "./types";

export const FIELD_STACK_GAP: Record<FieldSize, string> = {
  s: "gap-6",
  m: "gap-8",
  l: "gap-8",
  xl: "gap-8",
};

export const LABEL_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "text-caption-1 font-semibold",
  m: "text-body-3 font-semibold",
  l: "text-body-2 font-semibold",
  xl: "text-body-1 font-semibold",
};

export const HELPER_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "text-caption-2",
  m: "text-caption-1",
  l: "text-body-3",
  xl: "text-body-2",
};

export const HELPER_ICON_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "size-10",
  m: "size-14",
  l: "size-16",
  xl: "size-18",
};

export const ADORNMENT_ICON_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "size-12",
  m: "size-16",
  l: "size-20",
  xl: "size-24",
};

export const INPUT_FIELD_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "h-28 gap-6 rounded-8 p-8 text-caption-1",
  m: "h-36 gap-8 rounded-10 px-10 py-8 text-body-3",
  l: "h-44 gap-10 rounded-12 px-12 py-8 text-body-2",
  xl: "h-52 gap-12 rounded-14 px-14 py-8 text-body-1",
};

export const TEXTAREA_FIELD_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "min-h-96 rounded-8 p-10 text-caption-1",
  m: "min-h-96 rounded-10 p-10 text-body-3",
  l: "min-h-96 rounded-12 p-10 text-body-2",
  xl: "min-h-96 rounded-14 p-10 text-body-1",
};

/** Horizontal inset when start/end adornments are present */
export const INPUT_ADORNMENT_PADDING: Record<
  FieldSize,
  { start: string; end: string }
> = {
  s: { start: "pl-32", end: "pr-32" },
  m: { start: "pl-36", end: "pr-36" },
  l: { start: "pl-44", end: "pr-44" },
  xl: { start: "pl-52", end: "pr-52" },
};
