import type { ReactNode } from "react";

export type InfoBoxVariant = "info" | "warning" | "destructive";

export const INFO_BOX_VARIANTS: InfoBoxVariant[] = [
  "info",
  "warning",
  "destructive",
];

export interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
}
