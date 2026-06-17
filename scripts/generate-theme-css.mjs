import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const tokens = require("../src/theme/tokens.cjs");

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/theme/theme.css");

function flattenColors(colors, prefix = "") {
  const lines = [];
  for (const [key, value] of Object.entries(colors)) {
    const name = prefix ? `${prefix}-${key}` : key;
    if (typeof value === "string") {
      lines.push(`  --color-${name}: ${value};`);
    } else {
      lines.push(...flattenColors(value, name));
    }
  }
  return lines;
}

function emitFontSizes(fontSize, { mobileSuffix = "" } = {}) {
  const lines = [];
  for (const [key, value] of Object.entries(fontSize)) {
    const token = key;
    const suffix = mobileSuffix ? `-${mobileSuffix}` : "";
    if (Array.isArray(value)) {
      const [size, meta = {}] = value;
      lines.push(`  --text-${token}${suffix}: ${size};`);
      if (meta.lineHeight) {
        lines.push(
          `  --text-${token}${suffix}--line-height: ${meta.lineHeight};`
        );
      }
      if (meta.letterSpacing) {
        lines.push(
          `  --text-${token}${suffix}--letter-spacing: ${meta.letterSpacing};`
        );
      }
      if (meta.fontWeight) {
        lines.push(
          `  --text-${token}${suffix}--font-weight: ${meta.fontWeight};`
        );
      }
    } else {
      lines.push(`  --text-${token}${suffix}: ${value};`);
    }
  }
  return lines;
}

function typographyProps(token, { mobile = false } = {}) {
  const suffix = mobile ? "-mobile" : "";
  return [
    `    font-size: var(--text-${token}${suffix});`,
    `    line-height: var(--tw-leading, var(--text-${token}${suffix}--line-height));`,
    `    letter-spacing: var(--tw-tracking, var(--text-${token}${suffix}--letter-spacing));`,
    `    font-weight: var(--tw-font-weight, var(--text-${token}${suffix}--font-weight));`,
  ];
}

function emitResponsiveTypographyUtilities(fontSize) {
  const lines = ["@layer utilities {"];

  for (const token of Object.keys(fontSize)) {
    lines.push(`  .text-${token} {`);
    lines.push(...typographyProps(token, { mobile: true }));
    lines.push("  }");
  }

  lines.push("");
  lines.push("  /* Desktop scale — uses --breakpoint-md from @theme above */");
  lines.push("  @variant md {");
  for (const token of Object.keys(fontSize)) {
    lines.push(`    .text-${token} {`);
    lines.push(...typographyProps(token));
    lines.push("    }");
  }
  lines.push("  }");
  lines.push("}");
  return lines;
}

function emitTypographySafelist(fontSize) {
  const variants = Object.keys(fontSize)
    .map((token) => `md:text-${token}`)
    .join(" ");
  return [`@source inline("${variants}");`];
}

const lines = ["@theme {"];

for (const [family, stack] of Object.entries(tokens.fontFamily)) {
  const value = Array.isArray(stack) ? stack.join(", ") : stack;
  lines.push(`  --font-${family}: ${value};`);
}

lines.push(...flattenColors(tokens.colors));
lines.push(...emitFontSizes(tokens.fontSize));

if (tokens.fontSizeMobile) {
  lines.push(
    ...emitFontSizes(tokens.fontSizeMobile, { mobileSuffix: "mobile" })
  );
}

for (const [key, value] of Object.entries(tokens.fontWeight)) {
  lines.push(`  --font-weight-${key}: ${value};`);
}

for (const [key, value] of Object.entries(tokens.spacing)) {
  lines.push(`  --spacing-${key}: ${value};`);
}

for (const [key, value] of Object.entries(tokens.borderRadius)) {
  lines.push(`  --radius-${key}: ${value};`);
}

if (tokens.boxShadow) {
  for (const [key, value] of Object.entries(tokens.boxShadow)) {
    lines.push(`  --shadow-${key}: ${value};`);
  }
}

if (tokens.screens) {
  for (const [key, value] of Object.entries(tokens.screens)) {
    lines.push(`  --breakpoint-${key}: ${value};`);
  }
}

lines.push("}", "");
lines.push(...emitTypographySafelist(tokens.fontSize));
lines.push("");
lines.push(...emitResponsiveTypographyUtilities(tokens.fontSize));
lines.push("");

writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${outPath}`);
