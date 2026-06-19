import type { ReactNode } from "react";

export const CHIP_COLORS = [
  "primary",
  "tertiary",
  "success",
  "warning",
  "danger",
  "gray",
  "dark",
] as const;

export type ChipColor = (typeof CHIP_COLORS)[number];

export type LabelChipSize = "small" | "medium" | "large";

export const LABEL_CHIP_SIZES: LabelChipSize[] = ["small", "medium", "large"];

export interface LabelChipProps {
  text: string;
  icon?: ReactNode;
  color?: ChipColor;
  size?: LabelChipSize;
}
