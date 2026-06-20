import type { ReactNode } from "react";

export const CHIP_COLORS = [
  "primary",
  "tertiary",
  "success",
  "warning",
  "destructive",
  "gray",
  "dark",
] as const;

export type ChipColor = (typeof CHIP_COLORS)[number];

export type LabelChipSize = "s" | "m" | "l";

export const LABEL_CHIP_SIZES: LabelChipSize[] = ["s", "m", "l"];

export interface LabelChipProps {
  text: string;
  icon?: ReactNode;
  color?: ChipColor;
  size?: LabelChipSize;
}
