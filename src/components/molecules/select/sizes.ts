import type { FieldSize } from "../input-text/types";

export {
  ADORNMENT_ICON_SIZE_CLASSES as SELECT_ICON_SIZE_CLASSES,
  INPUT_FIELD_SIZE_CLASSES as SELECT_TRIGGER_SIZE_CLASSES,
} from "../input-text/sizes";

export const SELECT_OPTION_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "px-8 py-6 text-caption-1",
  m: "px-10 py-8 text-body-3",
  l: "px-12 py-8 text-body-2",
  xl: "px-14 py-10 text-body-1",
};

export const SELECT_TRIGGER_PHOTO_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "size-20",
  m: "size-24",
  l: "size-24",
  xl: "size-28",
};

export const SELECT_OPTION_PHOTO_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "size-20",
  m: "size-24",
  l: "size-32",
  xl: "size-36",
};

export const SELECT_CHECK_ICON_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "size-12",
  m: "size-16",
  l: "size-16",
  xl: "size-20",
};
