import type { ReactNode } from "react";

export type InfoBoxVariant = "info" | "warning" | "danger";

export const INFO_BOX_VARIANTS: InfoBoxVariant[] = [
  "info",
  "warning",
  "danger",
];

export interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}
