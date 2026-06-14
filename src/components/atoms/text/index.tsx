import React from "react";
import { cn } from "../../../lib/utils";
import { responsiveClasses, type Responsive } from "../../../lib/responsive";
import {
  isTextPreset,
  presetVariants,
  resolveTextVariant,
  TEXT_PRESETS,
  type TextPreset,
  type TextVariant,
} from "./presets";

export type { TextPreset, TextVariant };
export { TEXT_PRESETS, isTextPreset, presetVariants, resolveTextVariant };

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
  variant?: Responsive<TextVariant | TextPreset>;
  color?: Responsive<TextColor> | React.CSSProperties["color"];
  weight?: Responsive<"regular" | "semibold" | "bold">;
  textAlign?: Responsive<"left" | "center" | "right" | "justify">;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

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
  danger: "text-danger-main",
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

const presetToElement: Partial<
  Record<TextPreset, keyof React.JSX.IntrinsicElements>
> = {
  pageTitle: "h1",
  sectionTitle: "h2",
  subsectionTitle: "h3",
  cardTitle: "h4",
  label: "h5",
  overline: "h6",
  body: "p",
  bodySmall: "p",
  caption: "span",
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
  const resolvedVariantInput = resolveTextVariant(variant) ?? "body-2";

  const resolvedVariant =
    typeof resolvedVariantInput === "string"
      ? resolvedVariantInput
      : (resolvedVariantInput.base ?? "body-2");

  const getElement = (): keyof React.JSX.IntrinsicElements => {
    if (as) return as;
    if (typeof variant === "string" && isTextPreset(variant)) {
      return presetToElement[variant] ?? "span";
    }
    return variantToElement[resolvedVariant] ?? "span";
  };

  const isColorToken = typeof color === "string" && color in colorClasses;

  const Element = getElement();
  const resolvedStyle: React.CSSProperties | undefined = isColorToken
    ? style
    : { ...style, color: color as React.CSSProperties["color"] };

  return (
    <Element
      className={cn(
        responsiveClasses(resolvedVariantInput, variantClasses),
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

export default Text;
