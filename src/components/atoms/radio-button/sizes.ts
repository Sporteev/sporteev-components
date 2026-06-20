import type { FieldSize } from "@/components/molecules/input-text/types";

export {
  HELPER_SIZE_CLASSES as RADIO_HELPER_SIZE_CLASSES,
  LABEL_SIZE_CLASSES as RADIO_LABEL_SIZE_CLASSES,
} from "@/components/molecules/input-text/sizes";

export const RADIO_CONTROL_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "size-14",
  m: "size-16",
  l: "size-20",
  xl: "size-24",
};

export const RADIO_DOT_SIZE_CLASSES: Record<FieldSize, string> = {
  s: "size-6",
  m: "size-8",
  l: "size-10",
  xl: "size-12",
};

export const RADIO_ROW_GAP_CLASSES: Record<FieldSize, string> = {
  s: "gap-6",
  m: "gap-8",
  l: "gap-10",
  xl: "gap-12",
};

export const RADIO_OPTION_STACK_GAP_CLASSES: Record<FieldSize, string> = {
  s: "gap-4",
  m: "gap-6",
  l: "gap-6",
  xl: "gap-8",
};

export const RADIO_OPTION_HELPER_INDENT_CLASSES: Record<FieldSize, string> = {
  s: "pl-20",
  m: "pl-24",
  l: "pl-32",
  xl: "pl-36",
};
