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
pnpm add file:../sporteev-components
# or: pnpm add file:/path/to/sporteev-sporteev-components-1.1.21.tgz
```

3. Import and use the components in your test project:

```tsx
import { Button } from "@sporteev/sporteev-components";

function TestComponent() {
  return (
    <Button variant="primary" size="medium">
      Test Button
    </Button>
  );
}
```

4. To update the package after making changes:
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

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
