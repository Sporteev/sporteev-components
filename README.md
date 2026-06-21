# @sporteev/sporteev-components

Reusable React components and design tokens for Sporteev apps (and any consumer), built with TypeScript and Tailwind CSS v4.

**Toolchain:** Node 24+, pnpm 10.

## Install

```bash
pnpm add @sporteev/sporteev-components @solar-icons/react-perf
```

Peer dependencies: React 18 or 19, `@solar-icons/react-perf` ^2.1.1 — one install covers **Linear** and **Bold** (and other style subpaths). DS components use Linear by default; apps may import either style.

## Consumer setup (theme-only — recommended)

Each app compiles its own CSS from shared **tokens** + **component class names** via Tailwind v4 `@source` (see below).

### 1. Tailwind v4 in your app

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { dedupe: ["react", "react-dom"] },
});
```

### 2. CSS entry (`src/index.css`)

```css
@import "tailwindcss";
@import "@sporteev/sporteev-components/theme.css";
@import "@sporteev/sporteev-components/tailwind-source.css";
```

### 3. App entry (`src/main.tsx`)

```tsx
import "./index.css";
```

### 4. Use components

Import from the **package root only** — no `/atoms` subpaths or deep paths:

```tsx
import { Button, Modal, Text } from "@sporteev/sporteev-components";
import { Settings } from "@solar-icons/react-perf/Linear";
import { Star } from "@solar-icons/react-perf/Bold";
```

```tsx
function App() {
  return (
    <>
      <Text variant="h1" as="h1">
        Page title
      </Text>
      <Text variant="body-2" color="neutral">
        Body copy
      </Text>
      <Button variant="primary" size="m">
        Action
      </Button>
    </>
  );
}
```

Typography tokens (`h1`–`h6`, `body-*`, `caption-*`) scale mobile → desktop at the `md` breakpoint via `theme.css`.

Your app's build only emits CSS for components and classes you actually use.

### Tokens in your app UI

Use the same utilities as components: `text-h1`, `bg-primary-600`, `gap-12`, etc. Prefer design tokens over raw hex when a token exists.

### Extending components

Pass `className` and compose with existing components first. For feature-specific UI, wrap or fork in your app. Propose upstream changes only when the component would be shared across **2+ Sporteev products** — see [contributing.md](./contributing.md).

### Local development

```bash
# In sporteev-components
pnpm build

# In your app
pnpm add file:../sporteev-components
# After library changes:
pnpm update @sporteev/sporteev-components
```

See [contributing.md](./contributing.md) for Storybook, pack, publish, and contributor conventions.

## Troubleshooting

**Missing component styles** — confirm `tailwind-source.css` is imported in `index.css` (alongside `theme.css`). After library changes, run `pnpm build` in `sporteev-components`, then `pnpm update @sporteev/sporteev-components` in your app.

**Duplicate React** — add `resolve.dedupe: ["react", "react-dom"]` in Vite (see setup above).

## Package exports

| Import                                       | Purpose                     |
| -------------------------------------------- | --------------------------- |
| `@sporteev/sporteev-components`              | React components (JS)       |
| `@sporteev/sporteev-components/theme.css`         | Design tokens (`@theme`)              |
| `@sporteev/sporteev-components/tailwind-source.css` | Tailwind scan paths for library classes |
| `@sporteev/sporteev-components/theme/tokens`      | Raw `tokens.cjs` (advanced)           |

## Contributing

Design system development, conventions, and release process: [contributing.md](./contributing.md).

Consumer setup is documented in this README. AI IDE rules for contributors live in [.ide/](./.ide/) (run `pnpm setup:ide:cursor`, `setup:ide:claude`, or `setup:ide:kiro` after clone).

## License

MIT © [Sporteev](https://sporteev.id) — see [LICENSE](LICENSE).
