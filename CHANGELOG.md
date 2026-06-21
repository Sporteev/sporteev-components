# Component changes (v2.2.2)

## Fixed

- **`tailwind-source.css` missing from npm tarball** — add `src/tailwind-source.css` to package `files` (v2.2.1 export pointed at a file that was not published)

## Added

- **`tailwind-source.css` export** — consumers import `@sporteev/sporteev-components/tailwind-source.css` instead of `@source` paths into `node_modules`

---

# Component changes (v2.2.0)

Finalizes v2 API cleanup — standardized size tokens, `destructive` naming, theme-only distribution, and conventions tech-debt refactors.

---

## Breaking changes

| Area                      | Before                                     | After                                                          |
| ------------------------- | ------------------------------------------ | -------------------------------------------------------------- |
| **LabelChip**             | `size="small"` / `medium` / `large`        | `size="s"` / `m` / `l`                                         |
| **LabelChip**             | `color="danger"`                           | `color="destructive"`                                          |
| **ScoreIncreaseDecrease** | `variant` prop for size                    | **`size`** prop (`s` / `m` / `l`)                              |
| **ScoreIncreaseDecrease** | `danger` prop                              | **`destructive`**                                              |
| **InfoBox**               | `variant="danger"`                         | `variant="destructive"`                                        |
| **Text**                  | `color="danger"`                           | `color="destructive"` (removed duplicate)                      |
| **Toast**                 | `Snackbar` / `useSnackbar` aliases         | **Removed** — use `Toast` / `useToast` only                    |
| **Package**               | `@sporteev/sporteev-components/styles.css` | **Removed** — theme-only (`theme.css` + `tailwind-source.css`) |

---

## Refactored

- **File layout (Option B)** — `button`, `label-chip`, `info-box`, `text`, `radio-button`, `score-increase-decrease`, `radio-group`, `select`, `logo-flat`: impl in `{name}.tsx`, public props in `types.ts`, barrel `index.tsx`
- **Icons Storybook** — single `Icons` catalog (`Custom`, `Social`, `Sports`, `Logo`); dropped redundant per-icon stories
- **Styling** — removed `class-variance-authority` from `LabelChip`, `InfoBox`, `RadioGroup`, `Select`; dropped CVA from dependencies
- **Dev / Storybook CSS** — `src/index.css` with `@source` replaces `styles.css`; library entry no longer bundles pre-built CSS

---

## Fixed

- **Select** — dropdown anchored with `bottom` when opening above the trigger (short lists no longer float too high)
- **Select** — option chip renders beside the label instead of at the far edge of the row

---

## Migration (v2.1 → v2.2)

```tsx
// LabelChip
<LabelChip text="vs" color="primary" size="s" />

// ScoreIncreaseDecrease
<ScoreIncreaseDecrease
  size="m"
  destructive
  score={2}
  onIncrease={() => {}}
  onDecrease={() => {}}
/>

// InfoBox
<InfoBox variant="destructive" title="Error">Something went wrong.</InfoBox>

// Toast — aliases removed
const { showToast } = useToast();

// Consumer CSS — do not import styles.css
// app index.css:
@import "tailwindcss";
@import "@sporteev/sporteev-components/theme.css";
@import "@sporteev/sporteev-components/tailwind-source.css";
```

---

# Component changes (v2.1.0)

Design system 2.0 update — Figma-aligned components, shared sizing/variant patterns, and new primitives.

---

## Breaking changes

| Area           | Before                                        | After                                                                              |
| -------------- | --------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Button**     | `danger` prop / variant                       | `color="destructive"`                                                              |
| **Button**     | `small` / `medium` / `large`                  | `s` / `m` / `l` / `xl`                                                             |
| **InputText**  | `inputSize`                                   | `size`                                                                             |
| **InputText**  | `multiline` prop                              | Use **`TextArea`** instead                                                         |
| **InputText**  | Hover tooltip for helper                      | Inline **`helperText`** below field                                                |
| **Toast**      | `danger` variant                              | `destructive`                                                                      |
| **Toast**      | `Snackbar` / `useSnackbar`                    | **`Toast`** / **`useToast`** (aliases removed in 2.2.0)                            |
| **Modal**      | `small` / `medium` / `large`                  | `s` / `m` / `l`                                                                    |
| **Modal**      | Custom overlay markup                         | Radix Dialog (`@radix-ui/react-dialog`)                                            |
| **Text**       | Preset variants (`pageTitle`, `bodySmall`, …) | Typography tokens only: `h1`–`h6`, `body-*`, `caption-*`                           |
| **Typography** | Desktop scale at `lg` (1024px)                | Desktop scale at **`md` (768px)**                                                  |
| **Icons**      | `lucide-react`                                | Custom icons + `@solar-icons/react-perf` (Linear)                                  |
| **Install**    | Solar bundled in library                      | **`@solar-icons/react-perf` is a peer dependency** — consumer apps must install it |

---

## New

- **`IconButton`** — square hit targets; same `variant` × `color` matrix as `Button`; icon scales with `size` (`s`–`xl`) without passing `className="size-full"` on Solar icons
- **`TextArea`** — multiline field; shares `FieldShell` with `InputText` (label, helper, error, adornments)
- **Custom icons** — `SearchIcon`, `ChevronIcon`, `CloseIcon`, `PlusIcon`, `MinusIcon`; social: Google, Instagram, X, Threads, TikTok, WhatsApp, Telegram
- **Responsive typography** — `fontSize` + `fontSizeMobile` in `tokens.cjs`; `text-*` utilities scale at `md` (768px) via generated `theme.css` (`@variant md` — single breakpoint block, not per-token media queries)

---

## Fixed

- **IconButton / Button** — Solar icons default to `1em` and ignored wrapper `size-*`; icon spans now use `[&_svg]:size-full` so icons scale from `s` → `xl` without consumer-side sizing classes
- **Toast** — default variant icon color matches title/theme (removed `text-current` override that flattened icon color via `twMerge`)
- **Text** — `text-h1` + `text-grey-950` no longer conflict; `tailwind-merge` extended with typography tokens in the `font-size` group

---

## Refactored

### Button / IconButton

- API: `variant` (`primary` \| `secondary` \| `outline` \| `ghost`) × `color` (`primary` \| `secondary` \| `tertiary` \| `destructive` \| `warning` \| `success`)
- Figma dimensions, `rounded-8`, click uses `shadow-secondary`
- Logic split into `types.ts`, `sizes.ts`, `variants.ts`

### InputText / TextArea

- Sizes `s` / `m` / `l` / `xl`; shared `field-shell.tsx` + `field-styles.ts`
- Focus ring, `rounded-10` / `rounded-14` tokens

### Toast

- Variants: `success`, `destructive`, `warning`, `info`, `promises`
- `*-100` backgrounds + borders, `shadow-secondary`
- Desktop: horizontal row; mobile: stacked content + full-width action
- Close button uses `CloseIcon`; default icons use variant title color

### Modal

- Radix Dialog (focus trap, escape, outside click)
- `actionLayout`: `row` (default) or `col` (stacked full-width buttons)
- Overlay `bg-grey-900/50`, footer `border-grey-400`, `shadow-secondary`

### Text

- Use `variant="h1"` / `body-2` / `caption-1` etc. — each `text-*` class is mobile-first and scales at `md` (768px)
- `Responsive<T>` still supported for custom breakpoint overrides (e.g. `variant={{ base: "h5", md: "h3" }}`)
- Presets removed (`presets.ts` deleted)

### Icons

- Removed `lucide-react`; Solar Linear icons imported per file (`@solar-icons/react-perf/Linear` or `@solar-icons/react-perf/Bold`)
- **`@solar-icons/react-perf` is a peer dependency** — not bundled in `dist`; consumer apps install and import icons directly for page-level UI
- Library build externalizes Solar subpaths in Vite (shared copy with the app)

### Theme / tokens

- `screens.md: "768px"` in `tokens.cjs` → `--breakpoint-md` in `theme.css`
- Desktop typography generated inside one `@variant md` block (breakpoint defined once, not repeated per token)
- `var()` cannot be used in `@media` queries — use `@theme` + `@variant md` instead

### Minor

- **InfoBox** — `shadow-main`
- **Select** — dropdown uses `shadow-secondary`

---

## Tokens added

- `rounded-10`, `rounded-14`
- `fontSizeMobile` — Figma mobile scale paired 1:1 with desktop `fontSize`
- `screens.md` — mobile → desktop typography breakpoint (768px)
- Shadow usage: `shadow-main` (cards), `shadow-secondary` (toast, modal, select, button press)

---

## Migration cheatsheet

```bash
# Consumer apps (required peer)
pnpm add @sporteev/sporteev-components @solar-icons/react-perf react react-dom
```

```tsx
// Button
<Button variant="primary" color="destructive" size="m">Delete</Button>
<IconButton variant="outline" color="primary" size="m" aria-label="Search" icon={<SearchIcon />} />

// App-level Solar icons (peer dep — import directly, Linear or Bold style)
import { Settings } from "@solar-icons/react-perf/Linear";

// Fields
<InputText label="Email" size="m" helperText="We'll never share it." />
<TextArea label="Notes" rows={4} size="m" />

// Toast
const { showToast } = useToast();
showToast({ title: "Saved", variant: "success", onClose: () => {} });

// Modal
<Modal isOpen={open} onClose={close} size="m" actionLayout="row" actions={[...]} />

// Text (presets removed — use tokens)
<Text variant="h1" as="h1">Dashboard</Text>
<Text variant="body-2">Body copy</Text>
<Text variant={{ base: "h5", md: "h3" }}>Responsive override at md+</Text>

// Preset → token
// pageTitle → h1 | sectionTitle → h2 | body → body-1 | bodySmall → body-2 | caption → body-3
```

---

## Docs

- Styling conventions (CVA vs variant matrix): [`contributing.md`](./contributing.md)
