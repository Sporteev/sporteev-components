import type { ChipColor } from "./types";

export const LABEL_CHIP_COLOR_CLASSES: Record<ChipColor, string> = {
  primary: "bg-primary-200 text-primary-600",
  tertiary: "bg-tertiary-300 text-tertiary-700",
  success: "bg-success-accent text-success-main",
  warning: "bg-warning-accent text-warning-main",
  destructive: "bg-danger-accent text-danger-main",
  gray: "bg-grey-400 text-grey-800",
  dark: "bg-grey-700 text-grey-300",
};
