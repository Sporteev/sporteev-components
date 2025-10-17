import React from "react";
import { cn } from "../../../lib/utils";

export interface TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "bold-large-text"
    | "regular-large-text"
    | "multiline-large-text"
    | "bold-medium-text"
    | "regular-medium-text"
    | "multiline-medium-text"
    | "bold-small-text"
    | "regular-small-text"
    | "multiline-small-text";
  color?:
    | "primary"
    | "secondary"
    | "neutral"
    | "danger"
    | "success"
    | "warning";
  weight?: "normal" | "medium" | "semibold" | "bold";
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export const Text: React.FC<TextProps> = ({
  variant = "regular-medium-text",
  color = "neutral",
  weight,
  children,
  className,
  as,
}) => {
  // Determine the HTML element based on variant or as prop
  const getElement = (): keyof JSX.IntrinsicElements => {
    if (as) return as;

    // Map variants to semantic HTML elements
    const variantToElement: Record<string, keyof JSX.IntrinsicElements> = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      "multiline-large-text": "p",
      "multiline-medium-text": "p",
      "multiline-small-text": "p",
    };

    return variantToElement[variant] || "span";
  };

  // Variant classes with responsive typography - pixel perfect match to sporteev-crm
  // Using !important to override Material-UI typography styles
  const variantClasses = {
    h1: "!text-h1 lg:!text-h1-desktop",
    h2: "!text-h2 lg:!text-h2-desktop",
    h3: "!text-h3 lg:!text-h3-desktop",
    h4: "!text-h4 lg:!text-h4-desktop",
    h5: "!text-h5 lg:!text-h5-desktop",
    h6: "!text-h6 lg:!text-h6-desktop",
    "bold-large-text": "!text-bold-large-text lg:!text-bold-large-text-desktop",
    "regular-large-text":
      "!text-regular-large-text lg:!text-regular-large-text-desktop",
    "multiline-large-text":
      "!text-multiline-large-text lg:!text-multiline-large-text-desktop",
    "bold-medium-text":
      "!text-bold-medium-text lg:!text-bold-medium-text-desktop",
    "regular-medium-text":
      "!text-regular-medium-text lg:!text-regular-medium-text-desktop",
    "multiline-medium-text":
      "!text-multiline-medium-text lg:!text-multiline-medium-text-desktop",
    "bold-small-text": "!text-bold-small-text lg:!text-bold-small-text-desktop",
    "regular-small-text":
      "!text-regular-small-text lg:!text-regular-small-text-desktop",
    "multiline-small-text":
      "!text-multiline-small-text lg:!text-multiline-small-text-desktop",
  };

  // Color classes
  const colorClasses = {
    primary: "text-primary-80",
    secondary: "text-secondary-80",
    neutral: "text-neutral-100",
    danger: "text-danger-main",
    success: "text-success-main",
    warning: "text-warning-main",
  };

  // Weight classes (only apply if weight is explicitly set)
  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };

  const Element = getElement();

  return (
    <Element
      className={cn(
        variantClasses[variant],
        colorClasses[color],
        weight && weightClasses[weight],
        className
      )}
    >
      {children}
    </Element>
  );
};

export default Text;
