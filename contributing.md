# Sporteev Components Development Guide

A React component library for Sporteev applications, built with TypeScript, Tailwind CSS, and Vite.

**Toolchain:** Node 24+, pnpm 10 (see `packageManager` in `package.json`).

## Development

1. Clone the repository

2. Install dependencies:

```bash
pnpm install
```

3. Start Storybook for development:

```bash
pnpm storybook
```

### Formatting

```bash
pnpm format        # write
pnpm format:check  # CI check
```

Uses [Prettier](https://prettier.io) with `prettier-plugin-tailwindcss` for class sorting.

### Local Testing

To test components locally in another project:

1. Build and pack the library:

```bash
pnpm build
pnpm pack
```

This creates a `.tgz` file (e.g. `sporteev-sporteev-components-1.1.21.tgz`).

2. In your consumer project (e.g. sporteev-web-v2), install the local package:

```bash
pnpm add file:/path/to/sporteev-sporteev-components-1.1.21.tgz
```

3. Wire **theme-only** Tailwind in the consumer (see [README](./README.md#consumer-setup-theme-only--recommended)):

- `src/index.css` — import `theme.css` + `@source` library `src/components` and `src/lib`
- `src/main.tsx` — import `./index.css` only (do **not** import `styles.css`)

4. Use components in the test project:

```tsx
import { Button } from "@sporteev/sporteev-components";

function TestComponent() {
  return (
    <Button variant="primary" size="m">
      Test Button
    </Button>
  );
}
```

5. To update the package after making changes:
   - Rebuild in the library: `pnpm build`
   - In the consumer project: `pnpm update @sporteev/sporteev-components`

### Publishing

1. Log in to the npm registry (pnpm uses the same registry):

```bash
pnpm login
```

2. Publishing under the @sporteev organization:
   - Make sure you're a member of the organization [sporteev](https://www.npmjs.com/settings/sporteev/members).
   - Verify the package name in `package.json` starts with `@sporteev/`.

3. Choose the appropriate release command:

```bash
# Bug fixes (1.1.21 → 1.1.22)
pnpm run release:patch

# New features (1.1.21 → 1.2.0)
pnpm run release:minor

# Breaking changes (1.1.21 → 2.0.0)
pnpm run release:major
```

These commands will automatically:

- Update the version in `package.json`
- Create a git commit and tag
- Build the library
- Publish to the npm registry

Note: You don't need to manually update the version in `package.json` — the release scripts handle this.

## Component styling conventions

When adding or refactoring components, choose the styling pattern by **how variants compose** — not by habit.

### Prefer `types.ts` + `sizes.ts` + `variants.ts` (new refactors)

Used by **Button**, **IconButton**, **Modal**, and other Figma-aligned components.

| File | Purpose |
|------|---------|
| `types.ts` | Union types (`ButtonVariant`, `ModalSize`, …) and `*_SIZES` / `*_VARIANTS` arrays for Storybook |
| `sizes.ts` | Dimension class maps (`Record<Size, string>`) |
| `variants.ts` | Visual variant classes; shared helpers (e.g. `getButtonVariantClasses`) |
| `index.tsx` | Thin component — compose base + size + variant classes with `cn()` |

**API types stay explicit** — CVA’s `VariantProps` does not replace props like `isOpen`, `onClose`, or `actions`.

### Use a `Record` matrix when variants don’t stack

If each combination is a **designed cell** (not independent layers), use a nested `Record` and a helper:

```ts
// variant × color — 24 Figma cells, not composable layers
const VARIANT_COLOR_CLASSES: Record<ButtonVariant, Record<ButtonColor, string>> = { ... };

export function getButtonVariantClasses(variant, color, disabled) {
  if (disabled) return DISABLED_CLASSES;
  return VARIANT_COLOR_CLASSES[variant][color];
}
```

Do **not** model this with CVA `compoundVariants` — same data, more boilerplate.

### Use CVA only when variants compose on one element

Reach for `class-variance-authority` when **one DOM node** has a few **independent** axes that stack cleanly (e.g. `LabelChip`, `Select`, `InfoBox`):

```ts
const chipVariants = cva("base-classes", {
  variants: { color: { ... }, size: { ... } },
  defaultVariants: { color: "primary", size: "medium" },
});
```

### Inline / small maps for simple multi-node components

When there are only 2–3 variant axes spread across **different nodes** (overlay, content, footer), inline classes or a tiny `sizes.ts` is enough — see **Modal**.

### Migration direction

- **New work** → Button / Modal pattern (`types` + `sizes` + `variants` or inline).
- **Legacy CVA components** → migrate to this pattern when touched for Figma alignment.
- **Tailwind JIT** → keep class strings static and enumerable (Records and CVA both satisfy this).

The Cursor rule at `.cursor/rules/component-variants.mdc` mirrors this for agent-assisted edits.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
