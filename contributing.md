# Contributing to Sporteev Components

React design system for Sporteev apps — TypeScript, Tailwind CSS v4, Vite, Storybook.

Conventions summaries live here; agents use [`.ide/rules/`](./.ide/rules/) and [`.ide/skills/`](./.ide/skills/) for full detail.

**Toolchain:** Node 24+, pnpm 10 (`packageManager` in `package.json`).

## Contents

- [Quick start](#quick-start)
- [IDE / AI setup](#ide--ai-setup)
  - [Optional: Figma MCP in Cursor](#optional-figma-mcp-in-cursor)
- [How to create a new component](#how-to-create-a-new-component)
- [What belongs in this package](#what-belongs-in-this-package)
- [Repository structure](#repository-structure)
  - [Folder layout per component](#folder-layout-per-component)
  - [Exports](#exports)
- [Component API](#component-api)
- [Styling](#styling)
- [Radix primitives](#radix-primitives)
- [Icons](#icons)
- [Storybook](#storybook)
- [TypeScript](#typescript)
- [Local consumer testing](#local-consumer-testing)
- [Before you open a PR](#before-you-open-a-pr)
- [Release](#release)
- [Migration backlog](#migration-backlog)
- [License](#license)

## Quick start

```bash
git clone https://github.com/Sporteev/sporteev-components
cd sporteev-components
pnpm install
pnpm storybook   # per-component stories (port 6006)
# or
pnpm dev         # Vite app — all components on one page (src/main.tsx)
```

Use **Storybook** for isolated stories and controls, or **`pnpm dev`** to scroll through everything in the showcase app (`src/main.tsx`).

**Adding a component?** See [How to create a new component](#how-to-create-a-new-component).

## IDE / AI setup

Team rules and skills live in **`.ide/`** (git-tracked). Run the setup command for whichever tool you use:

```bash
pnpm setup:ide:cursor   # Cursor
pnpm setup:ide:claude   # Claude Code
pnpm setup:ide:kiro     # Kiro
```

This wires `.ide/` into your local IDE directory (gitignored). See [.ide/README.md](./.ide/README.md) for per-tool paths.

### Optional: Figma MCP in Cursor

Some contributors use [Framelink](https://www.framelink.ai/docs/quickstart) so Cursor agents can read layout and component data from pasted Figma URLs. That is **optional personal setup** in `~/.cursor/mcp.json` — not part of `pnpm setup:ide` and not required for the team.

The default workflow is unchanged: open Figma in the browser, match variant names, sizes, and states in `types.ts` (see [Component API](#component-api)), and link the frame in your PR.

## What belongs in this package

`@sporteev/sporteev-components` is Sporteev's shared design system: Figma-aligned components, design tokens, custom icons, and Storybook stories.

| Belongs here                                | Belongs in consumer apps       |
| ------------------------------------------- | ------------------------------ |
| Reusable atoms, molecules, organisms, icons | Pages, routes, layouts         |
| Design tokens (`tokens.cjs` → `theme.css`)  | Feature-specific UI            |
| `cn`, `responsiveClasses`, shared hooks     | Data fetching, auth, marketing |

**Consumers today:**

- **sporteev-web-v2**, **sporteev-crm** — theme-only Tailwind v4 (`theme.css` + `tailwind-source.css`)
- **sporteev-web** — legacy `styles.css` path (migration only; don't add new features for pre-built CSS)

## Repository structure

We follow [atomic design](https://atomicdesign.bradfrost.com/) for layers in this package. Templates and pages are **not** shipped here.

| Layer    | Path                        | Examples                                          |
| -------- | --------------------------- | ------------------------------------------------- |
| Atom     | `src/components/atoms/`     | Button, Text, Toast, LabelChip                    |
| Molecule | `src/components/molecules/` | InputText, Modal, Select, RadioGroup              |
| Organism | `src/components/organisms/` | Multi-block Figma sections reused across products |
| Icon     | `src/components/icons/`     | SearchIcon, LogoFlat, sports icons                |

**Quick decisions:**

1. Single primitive, no design system composition → **atom**
2. One focused pattern (field + label, dialog shell) → **molecule**
3. Distinct section combining multiple molecules, reused as a unit → **organism**
4. Icons → always `icons/`, never `atoms/`
5. Internal building blocks (`field-shell.tsx`) → private to the parent folder; don't export unless promoted

**Reference folders:** `molecules/modal/`, `molecules/input-text/`, `atoms/button/`, `atoms/snackbar/` (note `toast.tsx` when folder name ≠ component name).

### Folder layout per component

Each public component gets a **kebab-case folder**. `index.tsx` is **exports only** — implementation lives in `{name}.tsx`.

| File                 | Purpose                                                   |
| -------------------- | --------------------------------------------------------- |
| `index.tsx`          | Re-export components, types, hooks — no implementation    |
| `{name}.tsx`         | Component implementation                                  |
| `types.ts`           | `XxxProps`, unions, `*_VARIANTS` / `*_SIZES` / `*_COLORS` |
| `sizes.ts`           | `Record<Size, string>` when a size axis exists            |
| `variants.ts`        | Class maps, `getXxxVariantClasses()` helpers              |
| `{name}.stories.tsx` | Co-located Storybook (icons → single catalog — see below) |
| `use-{name}.ts`      | Colocated hooks (`use-toast.ts`)                          |

Example:

```
molecules/modal/
  index.tsx
  modal.tsx
  types.ts
  sizes.ts
  modal.stories.tsx

atoms/button/
  index.tsx
  button.tsx
  icon-button.tsx
  types.ts
  sizes.ts
  variants.ts
  button.stories.tsx
```

### Exports

Chain exports from the component folder up to the package root:

```
component/index.tsx → atoms|molecules|icons/index.tsx → src/index.tsx
```

- Use named exports + `export type { XxxProps }`
- Prefer explicit exports when `export *` would leak internals
- **Consumers import from the package root only** — no `/atoms` subpaths:

```tsx
import { Button, Modal } from "@sporteev/sporteev-components";
```

## Component API

Use **consistent prop names** across components unless a native HTML attribute conflicts.

| Prop                                  | Notes                                                                            |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| `variant`                             | Visual style axis — values from Figma, in `types.ts`                             |
| `color`                               | Semantic / palette axis — values from Figma                                      |
| `size`                                | `s` \| `m` \| `l` \| `xl` (default `m`) — never `inputSize`                      |
| `className`                           | Merged last via `cn()`; use `contentClassName`, `inputClassName` for inner nodes |
| `disabled`, `fullWidth`               | Standard boolean props                                                           |
| `isOpen` + `onClose`                  | Controlled modals/overlays                                                       |
| `label`, `helperText`, `errorMessage` | Form fields via FieldShell                                                       |
| `startIcon` / `endIcon`               | Button adornments                                                                |

Define **`interface XxxProps` in `types.ts`** — don't derive the public API from a styling helper.

```ts
export type ButtonSize = "s" | "m" | "l" | "xl";
export const BUTTON_SIZES: ButtonSize[] = ["s", "m", "l", "xl"];

export interface ButtonProps {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  className?: string;
  // …
}
```

**Variant and color values come from Figma** — model variant × color as two props when needed (Button), not one combined enum.

**forwardRef** for focusable/form elements. **Controlled:** Modal (`isOpen` + `onClose`), Select/RadioGroup (`value` + `onChange`), Toast (`useToast()`). See [TypeScript](#typescript) for `Omit` / `Pick` patterns.

## Styling

**Do not use `class-variance-authority` (CVA)** in new or refactored code.

Pick one approach:

1. **Default** — `types.ts` + `sizes.ts` + `variants.ts`, composed with `cn(base, sizes, variants, className)`
2. **Record matrix** — variant × color designed cells (`Record<Variant, Record<Color, string>>`) — see `atoms/button/variants.ts`
3. **Inline maps** — multi-node components (Modal overlay/panel/body) or simple atoms

**Static Tailwind class strings only.** Every utility must be a literal or map key — never `` `bg-${color}-600` ``. This is required for consumer `@source` scanning.

**Always use `cn()`** from `@/lib/utils`. Pass consumer `className` **last**.

**Design tokens:** edit `src/theme/tokens.cjs`, then `pnpm generate:theme` (runs on `prebuild`). Use theme utilities in components — `text-h1`, `bg-primary-600`, `rounded-8` — not default Tailwind palette names.

**Default interactive color ramp** (unless Figma says otherwise):

| State   | Shade         | Example                 |
| ------- | ------------- | ----------------------- |
| Resting | `{color}-600` | `bg-primary-600`        |
| Hover   | `{color}-700` | `hover:bg-primary-700`  |
| Active  | `{color}-800` | `active:bg-primary-800` |

Also: focus ring/border, disabled + `pointer-events-none`, error `border-destructive-600`. Multi-node components use targeted props (`contentClassName`, …) — root `className` → outermost node only.

## Radix primitives

Use [Radix UI](https://www.radix-ui.com/) **inside** molecules/organisms when a component needs accessible behavior we won't rebuild (focus trap, escape, portal, ARIA). Today: `@radix-ui/react-dialog` for **Modal** (`molecules/modal/modal.tsx`).

| Rule                  | Detail                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------- |
| Wrap, don't re-export | Consumers import `Modal` from `@sporteev/sporteev-components` — never Radix packages                    |
| DS API on top         | Public props use Sporteev names (`isOpen`, `onClose`); map to Radix internally (`open`, `onOpenChange`) |
| Style with Tailwind   | All visuals on Radix parts via `className` + `cn()` — DS owns design                                    |
| One package per need  | Default: no new deps. Add `@radix-ui/react-*` one at a time; discuss in PR                              |
| Bundled               | Radix is a library dependency, not a consumer peer                                                      |

Full agent rules: [`.ide/rules/radix-primitives.mdc`](./.ide/rules/radix-primitives.mdc).

## Icons

- **Solar (peer dep):** install `@solar-icons/react-perf` once — import **Linear** or **Bold** via subpath (`@solar-icons/react-perf/Linear`, `@solar-icons/react-perf/Bold`). No separate package per style.
- **Default in DS components:** Linear
- **App UI:** Linear or Bold — match Figma
- **Custom icons:** only when Solar can't cover the use case — live in `icons/custom/`, use `currentColor`, `PascalCase` + `Icon` suffix
- **Inside components:** size the icon wrapper in `sizes.ts`, use `[&_svg]:size-full` on the wrapper
- **Storybook:** one catalog file `icons/icons.stories.tsx` (title `Icons`) — don't add per-icon story files

## Storybook

Co-locate `{name}.stories.tsx` next to the component. Use CSF3 with `satisfies Meta<typeof Component>`.

- `tags: ["autodocs"]`
- Wire `argTypes` to const arrays from `types.ts` (`BUTTON_SIZES`, `BUTTON_VARIANTS`, …)
- `control: false` for callbacks and node props (`onClose`, `icon`)
- `parameters.layout`: `centered` by default; `fullscreen` for Modal/Toast

Include Default, AllSizes, AllVariants (+ variant×color matrix when relevant). Reference: `atoms/button/button.stories.tsx`.

## TypeScript

No `any` on exported APIs. Use `import type` where appropriate. Before merge: `pnpm lint`, `pnpm format:check`, `pnpm build` — verify new exports in `dist/sporteev-components.d.ts`.

## How to create a new component

For atoms, molecules, organisms, or custom icons. Copy **`atoms/button/`**, **`molecules/modal/`**, or **`molecules/input-text/`** — or use the **`new-component`** skill in `.ide/skills/` with an AI assistant.

### 1. Scope & layer

Confirm the component is shared across **2+ Sporteev products** with the same Figma spec; otherwise keep it in the consumer app. Pick `atoms/`, `molecules/`, `organisms/`, or `icons/` (never put icons in `atoms/`). Read Figma first — variants, colors, sizes, states.

### 2. Scaffold & API

```
{layer}/{kebab-name}/
  index.tsx           # exports only — no implementation
  {kebab-name}.tsx
  types.ts
  sizes.ts            # if size axis
  variants.ts         # if variant/color logic
  {kebab-name}.stories.tsx
```

In `types.ts`: `XxxProps`, Figma-aligned unions, and `*_VARIANTS` / `*_SIZES` arrays for Storybook. Size is always `s | m | l | xl` (default `m`). No CVA — props are explicit interfaces, not `VariantProps`.

### 3. Implement

Build `{name}.tsx` with `cn(base, sizes, variants, className)` — static Tailwind strings only, `className` last. Use `sizes.ts` / `variants.ts` or a Record matrix (see [Styling](#styling)). `forwardRef` for focusable elements. Barrel `index.tsx` re-exports component + types only.

### 4. Storybook & exports

Co-located story (see [Storybook](#storybook); icons → catalog). Export chain: folder `index.tsx` → layer barrel → `src/index.tsx`. Verify public name in `dist/sporteev-components.d.ts` after `pnpm build`.

### 5. Verify & ship

```bash
pnpm lint && pnpm format:check && pnpm build
pnpm storybook
```

Smoke-test `import { X } from "@sporteev/sporteev-components"` in Storybook or sporteev-web-v2. Add a `CHANGELOG` entry under **`New`**; link Figma in the PR.

**Dependencies:** no new packages by default. Radix — see [Radix primitives](#radix-primitives). New peer dep = **major** bump.

### Checklist

| Check                                             |
| ------------------------------------------------- |
| Scope & layer correct                             |
| Folder scaffolded (`index.tsx` exports only)      |
| `types.ts` + `sizes.ts` / `variants.ts` as needed |
| `{name}.tsx` — no CVA, static classes             |
| Storybook story (or icons catalog)                |
| Layer + root exports                              |
| Lint, format, build green                         |
| Smoke-test import + CHANGELOG                     |

## Local consumer testing

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

- `src/index.css` — import `theme.css` + `tailwind-source.css`
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

## Before you open a PR

**Branch naming:** branch from `main` with a prefix + short slug — `feat/input-text-error-state`, `fix/modal-focus-trap`, `refactor/select-no-cva`.

**Run locally:**

```bash
pnpm lint
pnpm format:check
pnpm build
```

Spot-check UI changes in Storybook or with `pnpm dev`. CI hooks are not configured yet — keep the above green before requesting review.

Link Figma frames or issues in the PR description when relevant.

## Release

Update `CHANGELOG.md` before release (`Breaking changes`, `New`, `Fixed`, `Refactored`).

Published to the `@sporteev` npm org. Membership required.

```bash
pnpm login
```

Runs version bump, tag, build, and publish from clean `main`.

```bash
pnpm run release:patch   # bug fixes, Figma-aligned visual corrections
pnpm run release:minor   # new components, optional props, deprecations with re-exports
pnpm run release:major   # breaking exports, prop renames, token renames, new peer deps
```

Each command bumps the version in `package.json`, commits that change, tags, builds, and publishes from clean `main`.

Deprecations: alias + `@deprecated` JSDoc in a **minor**; remove in the **next major**.

## License

MIT — see [LICENSE](LICENSE).
