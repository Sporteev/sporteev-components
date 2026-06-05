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

function emitFontSizes(fontSize) {
  const lines = [];
  for (const [key, value] of Object.entries(fontSize)) {
    const token = key;
    if (Array.isArray(value)) {
      const [size, meta = {}] = value;
      lines.push(`  --text-${token}: ${size};`);
      if (meta.lineHeight) {
        lines.push(`  --text-${token}--line-height: ${meta.lineHeight};`);
      }
      if (meta.letterSpacing) {
        lines.push(`  --text-${token}--letter-spacing: ${meta.letterSpacing};`);
      }
      if (meta.fontWeight) {
        lines.push(`  --text-${token}--font-weight: ${meta.fontWeight};`);
      }
    } else {
      lines.push(`  --text-${token}: ${value};`);
    }
  }
  return lines;
}

const lines = ["@theme {"];

for (const [family, stack] of Object.entries(tokens.fontFamily)) {
  const value = Array.isArray(stack) ? stack.join(", ") : stack;
  lines.push(`  --font-${family}: ${value};`);
}

lines.push(...flattenColors(tokens.colors));
lines.push(...emitFontSizes(tokens.fontSize));

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

writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${outPath}`);
