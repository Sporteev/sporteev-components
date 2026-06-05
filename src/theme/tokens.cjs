/**
 * Single source of truth for Sporteev design tokens.
 * Consumed by tailwind.preset.cjs (package + client apps) and the package Tailwind build.
 * @see .cursor/new-theme.mdx
 */

const letterSpacing = "-0.01em";

const headerType = (size, fontWeight = "600") => [
  size,
  { lineHeight: "1.2", letterSpacing, fontWeight },
];

const bodyType = (size, fontWeight = "400") => [
  size,
  { lineHeight: "1.4", letterSpacing, fontWeight },
];

const captionType = (size) => [
  size,
  { lineHeight: "1.4", letterSpacing, fontWeight: "400" },
];

const paletteScale = (steps) =>
  Object.fromEntries(steps.map(([key, value]) => [key, value]));

const grey = paletteScale([
  [100, "#FFFFFF"],
  [200, "#FDFCFF"],
  [300, "#F1F0F4"],
  [400, "#E3E2E6"],
  [500, "#909094"],
  [600, "#76777A"],
  [700, "#5D5E61"],
  [800, "#45474A"],
  [900, "#2F3033"],
  [950, "#1C1B1F"],
]);

const primary = paletteScale([
  [100, "#FCFDFE"],
  [200, "#DDEAF1"],
  [300, "#BDD7E3"],
  [400, "#9EC4D6"],
  [500, "#7EB1C9"],
  [600, "#006493"],
  [700, "#00557D"],
  [800, "#004667"],
  [900, "#003751"],
  [950, "#00283B"],
]);

const secondary = paletteScale([
  [100, "#FDFDFD"],
  [200, "#E5E7E9"],
  [300, "#CDD0D4"],
  [400, "#B5B9BF"],
  [500, "#9DA3AB"],
  [600, "#3C4858"],
  [700, "#333D4B"],
  [800, "#2A323E"],
  [900, "#212830"],
  [950, "#181D23"],
]);

const tertiary = paletteScale([
  [100, "#FDFDFE"],
  [200, "#E6E5F0"],
  [300, "#CFCCE3"],
  [400, "#B7B4D5"],
  [500, "#A09CC7"],
  [600, "#433A91"],
  [700, "#39317B"],
  [800, "#2F2966"],
  [900, "#252050"],
  [950, "#1B173A"],
]);

const successScale = paletteScale([
  [100, "#F8FCFB"],
  [200, "#C7E9DE"],
  [300, "#97D5C2"],
  [400, "#67C2A5"],
  [500, "#36AE89"],
  [600, "#069B6C"],
  [700, "#05885F"],
  [800, "#057451"],
  [900, "#046144"],
  [950, "#034E36"],
]);

const destructive = paletteScale([
  [100, "#FDF8FA"],
  [200, "#EECCD9"],
  [300, "#E0A0B8"],
  [400, "#D27496"],
  [500, "#C34775"],
  [600, "#B51B54"],
  [700, "#9E184A"],
  [800, "#88143F"],
  [900, "#711135"],
  [950, "#5B0E2A"],
]);

const warningScale = paletteScale([
  [100, "#FEFDF8"],
  [200, "#F9EEC7"],
  [300, "#F4DE96"],
  [400, "#EFCF65"],
  [500, "#EAC035"],
  [600, "#E5B104"],
  [700, "#C89B04"],
  [800, "#AC8503"],
  [900, "#8F6F03"],
  [950, "#735902"],
]);

// TODO: remove once we have "effects" defined by hipster
/** Semantic aliases for existing component APIs */
const success = {
  main: successScale[600],
  accent: successScale[100],
  "main-hover": successScale[700],
  "accent-hover": successScale[200],
};

const danger = {
  main: destructive[600],
  accent: destructive[100],
  "main-hover": destructive[700],
  "accent-hover": destructive[200],
};

const warning = {
  main: warningScale[600],
  accent: warningScale[100],
  "main-hover": warningScale[700],
  "accent-hover": warningScale[200],
};

const spacing = paletteScale([
  [0, "0px"],
  [2, "2px"],
  [4, "4px"],
  [6, "6px"],
  [8, "8px"],
  [10, "10px"],
  [12, "12px"],
  [14, "14px"],
  [16, "16px"],
  [18, "18px"],
  [20, "20px"],
  [24, "24px"],
  [28, "28px"],
  [32, "32px"],
  [36, "36px"],
  [40, "40px"],
  [44, "44px"],
  [48, "48px"],
  [52, "52px"],
  [56, "56px"],
  [60, "60px"],
  [64, "64px"],
  [72, "72px"],
  [80, "80px"],
  [96, "96px"],
  [112, "112px"],
  [128, "128px"],
  [160, "160px"],
  [192, "192px"],
  [240, "240px"],
  [320, "320px"],
]);

const borderRadius = {
  ...paletteScale([
    [0, "0px"],
    [2, "2px"],
    [4, "4px"],
    [6, "6px"],
    [8, "8px"],
    [12, "12px"],
    [16, "16px"],
    [20, "20px"],
    [24, "24px"],
    [32, "32px"],
  ]),
  full: "9999px",
};

module.exports = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    primary,
    secondary,
    tertiary,
    grey,
    /** @deprecated Use `grey` — kept for existing class names during 2.x migration */
    neutral: grey,
    success: { ...successScale, ...success },
    destructive,
    /** @deprecated Use `destructive` scale — semantic shortcuts for components */
    danger,
    warning: { ...warningScale, ...warning },
    gradient: {
      1: "linear-gradient(90deg, #004995 0%, #00335C 100%)",
      2: "linear-gradient(90deg, #0474A8 0%, #0459A8 100%)",
      3: "linear-gradient(90deg, #3681CC 0%, #4F3A95 100%)",
      4: "linear-gradient(90deg, #776AE2 0%, #422DF8 100%)",
      5: "linear-gradient(90deg, #59AAFF 0%, #6E74FF 100%)",
      gold: "linear-gradient(90deg, #E9BA0B 0%, #B07C00 100%)",
      bronze: "linear-gradient(90deg, #D7915F 0%, #7A3D11 100%)",
      silver: "linear-gradient(90deg, #8F9090 0%, #4E5054 100%)",
      hero: "linear-gradient(90deg, #FFFFFF 0%, #757575 100%)",
      soft: "linear-gradient(to right, #59AAFF, #6E74FF)",
      /** @deprecated Use `gradient-2` */
      primary: "linear-gradient(90deg, #0474A8 0%, #0459A8 100%)",
      /** @deprecated Use `gradient-3` */
      mixed: "linear-gradient(90deg, #3681CC 0%, #4F3A95 100%)",
      dark: "linear-gradient(90deg, #2F3033 0%, #5D5E61 100%)",
    },
  },
  fontFamily: {
    sans: [
      "Inter",
      "ui-sans-serif",
      "system-ui",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji",
    ],
  },
  fontSize: {
    // Desktop scale — pair with mobile via Text Responsive<T> (see refactor-plan.mdx)
    h1: headerType("64px"),
    h2: headerType("48px"),
    h3: headerType("40px"),
    h4: headerType("36px"),
    h5: headerType("32px"),
    h6: headerType("24px"),
    h7: headerType("20px"),
    h8: headerType("16px"),
    "body-1": bodyType("16px"),
    "body-2": bodyType("14px"),
    "body-3": bodyType("12px"),
    "caption-1": captionType("10px"),
    "caption-2": captionType("8px"),
  },
  fontWeight: {
    regular: "400",
    semibold: "600",
    bold: "700",
  },
  spacing,
  borderRadius,
};
