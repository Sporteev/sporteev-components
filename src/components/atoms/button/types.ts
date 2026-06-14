export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

export type ButtonColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "destructive"
  | "warning"
  | "success";

export type ButtonSize = "s" | "m" | "l" | "xl";

export const BUTTON_COLORS: ButtonColor[] = [
  "primary",
  "secondary",
  "tertiary",
  "destructive",
  "warning",
  "success",
];

export const BUTTON_VARIANTS: ButtonVariant[] = [
  "primary",
  "secondary",
  "outline",
  "ghost",
];

export const BUTTON_SIZES: ButtonSize[] = ["s", "m", "l", "xl"];
