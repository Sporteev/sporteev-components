import type { InfoBoxVariant } from "./types";

export const INFO_BOX_BASE_CLASSES =
  "flex items-start gap-8 rounded-8 p-16 shadow-main";

export const INFO_BOX_BACKGROUND_CLASSES: Record<InfoBoxVariant, string> = {
  info: "bg-primary-100",
  warning: "bg-warning-accent",
  danger: "bg-danger-accent",
};

export const INFO_BOX_ICON_BASE_CLASSES = "h-24 w-24 shrink-0";

export const INFO_BOX_ICON_CLASSES: Record<InfoBoxVariant, string> = {
  info: "text-primary-600",
  warning: "text-warning-main",
  danger: "text-danger-main",
};

export const INFO_BOX_TITLE_CLASSES: Record<InfoBoxVariant, string> = {
  info: "font-bold mb-8 mt-0 text-primary-700",
  warning: "font-bold mb-8 mt-0 text-warning-main",
  danger: "font-bold mb-8 mt-0 text-danger-main",
};

export const INFO_BOX_DESCRIPTION_CLASSES: Record<InfoBoxVariant, string> = {
  info: "h-full text-sm mt-2 text-primary-700",
  warning: "h-full text-sm mt-2 text-warning-main",
  danger: "h-full text-sm mt-2 text-danger-main",
};
