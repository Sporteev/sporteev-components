import type { ButtonSize } from "./types";

export const TEXT_BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  s: "h-28 gap-6 px-12 py-4 text-caption-1",
  m: "h-36 gap-8 px-14 py-6 text-body-3",
  l: "h-44 gap-10 px-16 py-8 text-body-2",
  xl: "h-52 gap-10 px-16 py-8 text-body-1",
};

export const TEXT_BUTTON_ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  s: "size-12 shrink-0",
  m: "size-16 shrink-0",
  l: "size-20 shrink-0",
  xl: "size-24 shrink-0",
};

export const ICON_BUTTON_SIZE_CLASSES: Record<ButtonSize, string> = {
  s: "size-28",
  m: "size-36",
  l: "size-44",
  xl: "size-52",
};

export const ICON_BUTTON_ICON_SIZE_CLASSES: Record<ButtonSize, string> = {
  s: "size-12",
  m: "size-16",
  l: "size-20",
  xl: "size-24",
};
