# Sporteev Components

A React component library for Sporteev applications, built with TypeScript, Tailwind CSS, and Vite.

## Features

- 🎨 Modern and accessible UI components
- ⚡ Built with Vite for fast development and building
- 📦 Tree-shakeable and optimized for production
- 🎭 Support for different variants and states
- 📱 Responsive and mobile-friendly
- 🎯 TypeScript support
- 🎨 Tailwind CSS integration

## Installation

### For Development

1. Clone the repository:

```bash
git clone https://github.com/sporteev/sporteev-components.git
cd sporteev-components
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Start Storybook for development:

```bash
npm run storybook
```

## Usage

### Basic Usage

```tsx
import { Button } from "@sporteev/sporteev-components";

function App() {
  return (
    <Button variant="primary" size="medium">
      Click me
    </Button>
  );
}
```

## Development

### Local Testing

To test components locally in another project:

1. Build and pack the library:

```bash
npm run build
npm pack
```

This will create a `.tgz` file (e.g., `sporteev-components-1.0.0.tgz`)

2. In your test project, install the local package:

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
   - In your test project, update the package:
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

3. Update the version in `package.json`
4. Build the library:

```bash
npm run build
```

5. Publish to npm:

```bash
npm publish --access public
```

The `--access public` flag is required when publishing scoped packages (packages under an organization).

Note: The `npm pack` command is only needed for local testing, not for publishing. The `npm publish` command will automatically handle the packaging process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
