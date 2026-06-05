# @sporteev/sporteev-components

Reusable React components and design tokens for Sporteev apps (and any consumer), built with TypeScript and Tailwind CSS v4.

**Toolchain:** Node 24+, pnpm 10.

## Install

```bash
pnpm add @sporteev/sporteev-components
```

Peer dependency: React 18 or 19.

## Consumer setup (theme-only — recommended)

Each app compiles its own CSS from shared **tokens** + **component class names**. Do **not** import `styles.css` in new apps (v2, CRM, etc.) — that keeps bundles lean.

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

/* Scan library components so Tailwind generates their utilities */
@source "../node_modules/@sporteev/sporteev-components/src/components";
@source "../node_modules/@sporteev/sporteev-components/src/lib";
```

### 3. App entry (`src/main.tsx`)

```tsx
import "./index.css";
```

### 4. Use components

```tsx
import { Button, Text } from "@sporteev/sporteev-components";

function App() {
  return (
    <Text variant="body-2" color="neutral">
      Hello
    </Text>
  );
}
```

Your app’s build only emits CSS for components and classes you actually use.

### Local development

```bash
# In sporteev-components
pnpm build

# In your app
pnpm add file:../sporteev-components
# After library changes:
pnpm update @sporteev/sporteev-components
```

See [DEVELOPMENT.md](./DEVELOPMENT.md) for Storybook, pack, and publish.

## Legacy: `styles.css`

`@sporteev/sporteev-components/styles.css` is pre-built CSS from the library build (~all component utilities). Kept for **legacy** consumers during migration. **New apps should use theme-only** (above).

## Package exports

| Import                                       | Purpose                                  |
| -------------------------------------------- | ---------------------------------------- |
| `@sporteev/sporteev-components`              | React components (JS)                    |
| `@sporteev/sporteev-components/theme.css`    | Design tokens (`@theme`)                 |
| `@sporteev/sporteev-components/styles.css`   | Legacy pre-built CSS (avoid in new apps) |
| `@sporteev/sporteev-components/theme/tokens` | Raw `tokens.cjs` (advanced)              |

## Architecture

Design system rules and consumer patterns: [refactor-plan.mdx](./refactor-plan.mdx) (single source of truth for v2, CRM, and all consumers).

## License

MIT © [Sporteev](https://sporteev.id) — see [LICENSE](LICENSE).
