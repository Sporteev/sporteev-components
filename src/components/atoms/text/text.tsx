import React from "react";
import { cn } from "@/lib/utils";
import { responsiveClasses, type Responsive } from "@/lib/responsive";
import type { TextColor, TextProps, TextVariant } from "./types";

const variantClasses: Record<TextVariant, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
  h5: "text-h5",
  h6: "text-h6",
  "body-1": "text-body-1",
  "body-2": "text-body-2",
  "body-3": "text-body-3",
  "caption-1": "text-caption-1",
  "caption-2": "text-caption-2",
};

const colorClasses: Record<TextColor, string> = {
  primary: "text-primary-600",
  secondary: "text-secondary-600",
  tertiary: "text-tertiary-600",
  neutral: "text-grey-950",
  destructive: "text-destructive-600",
  success: "text-success-main",
  warning: "text-warning-main",
};

const weightClasses = {
  regular: "font-regular",
  semibold: "font-semibold",
  bold: "font-bold",
};

const textAlignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const variantToElement: Partial<
  Record<TextVariant, keyof React.JSX.IntrinsicElements>
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "body-1": "p",
  "body-2": "p",
  "body-3": "p",
};

function resolveVariantToken(
  variant: Responsive<TextVariant> | undefined
): TextVariant {
  if (variant === undefined) return "body-2";
  if (typeof variant === "string") return variant;
  return variant.base ?? "body-2";
}

export const Text: React.FC<TextProps> = ({
  variant = "body-2",
  color = "neutral",
  weight,
  textAlign,
  children,
  className,
  style,
  as,
}) => {
  const resolvedVariant = resolveVariantToken(variant);

  const Element = as ?? variantToElement[resolvedVariant] ?? "span";
  const isColorToken = typeof color === "string" && color in colorClasses;
  const resolvedStyle: React.CSSProperties | undefined = isColorToken
    ? style
    : { ...style, color: color as React.CSSProperties["color"] };

  return (
    <Element
      className={cn(
        responsiveClasses(variant, variantClasses),
        isColorToken
          ? responsiveClasses(color as Responsive<TextColor>, colorClasses)
          : undefined,
        weight && responsiveClasses(weight, weightClasses),
        textAlign && responsiveClasses(textAlign, textAlignClasses),
        className
      )}
      style={resolvedStyle}
    >
      {children}
    </Element>
  );
};
