---
name: new-component
description: Scaffold a new design-system component in sporteev-components — scope, folder layout, types, styling, story, exports, CHANGELOG. Use when adding atoms, molecules, organisms, or custom icons.
---

# New component workflow

Executable checklist for adding a public component. Read:

- `component-structure.mdc` — layers, folders, exports
- `component-api.mdc` — props, types.ts, controlled patterns
- `component-styling.mdc` — sizes, variants, no CVA
- `typescript.mdc` — `import type`, build, lint/format (component types → `component-api.mdc`)
- `icons.mdc` — custom icons (if adding to `icons/`)
- `storybook.mdc` — stories
- `theme.mdc` — tokens and JIT

Human summary: `contributing.md` → How to create a new component.

## 1. Scope check

Before writing code:

- [ ] Pick atomic layer:

| Layer    | Path         | When                                            |
| -------- | ------------ | ----------------------------------------------- |
| Atom     | `atoms/`     | Single primitive, no desigbn system composition |
| Molecule | `molecules/` | Field, dialog, option list pattern              |
| Organism | `organisms/` | Multi-block section reused as a unit            |
| Icon     | `icons/`     | Custom SVG / logo (never `atoms/`)              |

- [ ] Open Figma — list variant names, colors, sizes, states (hover, disabled, error)
- [ ] Pick exemplar folder to copy structure from:

| Pattern            | Copy from               |
| ------------------ | ----------------------- |
| Variant × color    | `atoms/button/`         |
| Multi-node overlay | `molecules/modal/`      |
| Form field         | `molecules/input-text/` |
| Hook-based         | `atoms/snackbar/`       |

## 2. Scaffold folder

Create `src/components/{layer}/{kebab-name}/`:

```
{layer}/{kebab-name}/
  index.tsx              # exports ONLY
  {kebab-name}.tsx       # implementation
  types.ts               # XxxProps, unions, *_VARIANTS, *_SIZES, *_COLORS
  sizes.ts               # if size axis
  variants.ts            # if variant/color logic
  {kebab-name}.stories.tsx
```

**Rules:**

- `index.tsx` must not contain implementation
- Folder name ≠ component name → use component name for file (`snackbar/toast.tsx`)
- Internal helpers (`field-shell.tsx`) stay private — don't export

## 3. Define types.ts

```ts
export type FooSize = "s" | "m" | "l"; // omit xl if Figma has 3 steps only
export const FOO_SIZES: FooSize[] = ["s", "m", "l"];

export type FooVariant = "primary" | "secondary"; // from Figma
export const FOO_VARIANTS: FooVariant[] = ["primary", "secondary"];

export interface FooProps {
  variant?: FooVariant;
  size?: FooSize;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}
```

- [ ] Union types + const arrays for Storybook `argTypes`
- [ ] Values match Figma exactly — don't invent variant/color names
- [ ] No CVA `VariantProps` as public API
- [ ] `size` prop name always `size` (not `inputSize`)

## 4. Implement {name}.tsx

**Styling — pick one (see `component-styling.mdc` decision tree):**

1. `sizes.ts` + `variants.ts` + `cn(base, size, variant, className)`
2. `Record<Variant, Record<Color, string>>` matrix + helper function
3. Inline per-node maps (Modal-style)

**Required:**

- [ ] **No CVA**
- [ ] Static Tailwind strings only — no `` `bg-${x}-600` ``
- [ ] `cn()` from `@/lib/utils`; consumer `className` **last**
- [ ] Default color ramp: 600 → 700 → 800 for hover/active (unless Figma differs)
- [ ] `forwardRef` + `displayName` if focusable/form element
- [ ] Icon wrappers: `[&_svg]:size-full` in `sizes.ts`

**sizes.ts example:**

```ts
import type { FooSize } from "./types";

export const FOO_SIZE_CLASSES: Record<FooSize, string> = {
  s: "h-32 px-12 text-body-2",
  m: "h-36 px-16 text-body-1",
  l: "h-40 px-20 text-body-1",
};
```

**index.tsx (exports only):**

```ts
export { Foo } from "./foo";
export type { FooProps, FooSize, FooVariant } from "./types";
export { FOO_SIZES, FOO_VARIANTS } from "./types";
```

## 5. Storybook

See `.ide/rules/storybook.mdc` for full conventions.

- [ ] Co-located `{name}.stories.tsx` OR add to `icons/icons.stories.tsx` for icons
- [ ] Title: `Atoms/Foo` or `Molecules/Foo`
- [ ] `satisfies Meta<typeof Foo>` + `tags: ["autodocs"]`
- [ ] `argTypes` wired to `*_SIZES`, `*_VARIANTS` from `types.ts`
- [ ] `control: false` for `onClick`, `onClose`, `icon`, node props
- [ ] `parameters.layout`: `centered` (default) or `fullscreen` (Modal/Toast)

**Minimum stories:**

| Story           | Required when                           |
| --------------- | --------------------------------------- |
| `Default`       | Always                                  |
| `AllSizes`      | Component has `size` prop               |
| `AllVariants`   | Component has `variant` prop            |
| Matrix story    | Variant × color designed (Button-style) |
| `Disabled`      | Component has `disabled`                |
| Controlled demo | Modal, Select, RadioGroup               |

Use `.map()` over const arrays. Reference: `atoms/button/button.stories.tsx`.

For icons passed as props in stories: `className="size-full"`.

## 6. Export chain

1. [ ] Folder `index.tsx` exports component + types
2. [ ] Add to layer barrel: `src/components/atoms/index.tsx` (or `molecules/` / `organisms/` / `icons/`)
3. [ ] Confirm re-export from `src/index.tsx` (usually via layer barrel)
4. [ ] `pnpm build` → verify name in `dist/sporteev-components.d.ts`

Use explicit named exports when `export *` would leak internals.

## 7. Verify

```bash
pnpm lint && pnpm format:check && pnpm build
pnpm storybook   # spot-check all stories
```

- [ ] `import { Foo } from "@sporteev/sporteev-components"` works in Storybook or sporteev-web-v2
- [ ] If `tokens.cjs` changed → `pnpm generate:theme` ran
- [ ] No new peer dependencies without major bump discussion

## 8. Document

- [ ] `CHANGELOG.md` entry under **`New`**
- [ ] PR links Figma frame
- [ ] Call out breaking changes if any

## 9. Dependencies

| Situation            | Action                                                                             |
| -------------------- | ---------------------------------------------------------------------------------- |
| Default              | No new packages                                                                    |
| Need Radix primitive | Follow `radix-primitives.mdc` — wrap internally, DS API on top; one package per PR |
| New peer dep         | **Major** semver bump required                                                     |

## Quick checklist

|                                          |     |
| ---------------------------------------- | --- |
| Scope & layer                            | ☐   |
| Folder scaffolded (index = exports only) | ☐   |
| types.ts + sizes/variants as needed      | ☐   |
| No CVA, static classes                   | ☐   |
| Storybook story                          | ☐   |
| Layer + root exports                     | ☐   |
| lint + format:check + build              | ☐   |
| CHANGELOG → New                          | ☐   |
