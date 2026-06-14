import type { Responsive } from "../../../lib/responsive";

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

/** Semantic typography presets — mobile (base) → desktop (lg) per new-theme.mdx */
export type TextPreset =
  | "pageTitle"
  | "sectionTitle"
  | "subsectionTitle"
  | "cardTitle"
  | "label"
  | "overline"
  | "body"
  | "bodySmall"
  | "caption";

export const TEXT_PRESETS: TextPreset[] = [
  "pageTitle",
  "sectionTitle",
  "subsectionTitle",
  "cardTitle",
  "label",
  "overline",
  "body",
  "bodySmall",
  "caption",
];

export const presetVariants: Record<TextPreset, Responsive<TextVariant>> = {
  pageTitle: { base: "h3", lg: "h1" },
  sectionTitle: { base: "h4", lg: "h2" },
  subsectionTitle: { base: "h4", lg: "h3" },
  cardTitle: { base: "h5", lg: "h4" },
  label: { base: "h6", lg: "h5" },
  overline: { base: "body-2", lg: "h6" },
  body: { base: "body-2", lg: "body-1" },
  bodySmall: { base: "body-3", lg: "body-2" },
  caption: { base: "caption-1", lg: "body-3" },
};

export function isTextPreset(value: string): value is TextPreset {
  return TEXT_PRESETS.includes(value as TextPreset);
}

export function resolveTextVariant(
  variant: Responsive<TextVariant | TextPreset> | undefined
): Responsive<TextVariant> | undefined {
  if (variant === undefined) return undefined;

  if (typeof variant === "string") {
    return isTextPreset(variant) ? presetVariants[variant] : variant;
  }

  return Object.fromEntries(
    Object.entries(variant).map(([breakpoint, token]) => [
      breakpoint,
      token && isTextPreset(token) ? presetVariants[token] : token,
    ])
  ) as Responsive<TextVariant>;
}
