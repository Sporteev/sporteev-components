# Sporteev Components Development Guide

A React component library for Sporteev applications, built with TypeScript, Tailwind CSS, and Vite.

## Development

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Start Storybook for development:

```bash
npm run storybook
```

### Local Testing

To test components locally in another project:

1. Build and pack the library:

```bash
npm run build
npm pack
```

This will create a `.tgz` file (e.g., `sporteev-components-1.0.0.tgz`)

2. In your test project (consumer repo), install the local package:

```bash
npm install /path/to/sporteev-components-1.0.0.tgz
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
   - Rebuild and repack the library
   - In your consumer project, update the package:
   ```bash
   npm update @sporteev/sporteev-components
   ```

### Publishing

1. Ensure you're logged in to npm:

```bash
npm login
```

You'll be prompted for your npm username, password, and email.

2. If publishing under the @sporteev organization:

   - Make sure you're a member of the organization
   - Verify the package name in `package.json` starts with `@sporteev/`

3. Choose the appropriate release command based on the type of changes:

```bash
# For bug fixes (0.0.1 → 0.0.2)
npm run release:patch

# For new features (0.0.1 → 0.1.0)
npm run release:minor

# For breaking changes (0.0.1 → 1.0.0)
npm run release:major
```

These commands will automatically:

- Update the version in package.json
- Create a git commit and tag
- Build the library
- Publish to npm

Note: You don't need to manually update the version in package.json - the release scripts handle this automatically.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
