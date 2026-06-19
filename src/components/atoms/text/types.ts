import type React from "react";
import type { Responsive } from "@/lib/responsive";

export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-1"
  | "body-2"
  | "body-3"
  | "caption-1"
  | "caption-2";

export const TEXT_VARIANTS: TextVariant[] = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "body-1",
  "body-2",
  "body-3",
  "caption-1",
  "caption-2",
];

export type TextColor =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "destructive"
  | "danger"
  | "success"
  | "warning";

export interface TextProps {
  variant?: Responsive<TextVariant>;
  color?: Responsive<TextColor> | React.CSSProperties["color"];
  weight?: Responsive<"regular" | "semibold" | "bold">;
  textAlign?: Responsive<"left" | "center" | "right" | "justify">;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}
