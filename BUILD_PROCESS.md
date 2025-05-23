# Sporteev Components Library Build Process

This document explains the build process and styling handling for the Sporteev Components library.

## Overview

The Sporteev Components library is built using Vite and TypeScript, with Tailwind CSS for styling. The build process ensures that components are properly bundled, typed, and styled for consumption in other projects.

## Build Configuration

### Package.json Configuration

The `package.json` file contains several important configurations:

```json
{
  "name": "@sporteev/sporteev-components",
  "main": "dist/sporteev-components.umd.js", // CommonJS bundle
  "module": "dist/sporteev-components.es.js", // ES Module bundle
  "types": "dist/sporteev-components.d.ts", // TypeScript declarations
  "style": "dist/assets/style.css", // Main CSS bundle
  "exports": {
    ".": {
      "types": "./dist/sporteev-components.d.ts",
      "import": "./dist/sporteev-components.es.js",
      "require": "./dist/sporteev-components.umd.js",
      "style": "./dist/assets/style.css"
    },
    "./dist/assets/style.css": "./dist/assets/style.css"
  }
}
```

### Build Scripts

The library uses several npm scripts for building and development:

- `build`: Runs Vite build and TypeScript declaration generation
- `dev`: Starts Vite development server
- `prepare`: Automatically runs build before publishing
- `release:*`: Version and publish the package

## Build Process Steps

1. **Component Compilation**

   - Vite compiles React components using `@vitejs/plugin-react`
   - TypeScript files are transpiled to JavaScript
   - JSX is transformed to React.createElement calls

2. **Style Processing**

   - Tailwind CSS processes component styles
   - Styles are extracted and bundled into `dist/assets/style.css`
   - CSS is minified and optimized for production

3. **Type Generation**

   - TypeScript generates declaration files (`.d.ts`)
   - Declaration files are bundled into `dist/sporteev-components.d.ts`
   - Types are preserved for better IDE support

4. **Bundle Generation**
   - ES Module bundle (`dist/sporteev-components.es.js`)
   - UMD bundle (`dist/sporteev-components.umd.js`)
   - Source maps for debugging

## Styling Architecture

### Tailwind CSS Integration

The library uses Tailwind CSS for styling components. The setup includes:

1. **Tailwind Configuration**

   - Custom theme configuration in `tailwind.config.js`
   - Component-specific styles using Tailwind classes
   - Utility classes for component variants

2. **Style Processing**
   - Styles are processed during build
   - Tailwind classes are purged for production
   - CSS is extracted and bundled

### Style Consumption

To use the components in a project:

1. **Install Dependencies**

   ```bash
   npm install @sporteev/sporteev-components
   ```

2. **Import Styles**

   ```css
   /* In your project's CSS file */
   @import "@sporteev/sporteev-components/dist/assets/style.css";
   ```

3. **Configure Tailwind**
   - Add the component library to your Tailwind content configuration
   - Extend the theme if needed

## Development Workflow

1. **Local Development**

   ```bash
   npm run dev        # Start development server
   npm run storybook  # Run Storybook for component development
   ```

2. **Building for Production**

   ```bash
   npm run build      # Build the library
   npm pack          # Create a tarball for local testing
   ```

3. **Testing in Another Project**

   ```bash
   # In the component library directory
   npm run build && npm pack

   # In the consuming project
   npm install ../path/to/sporteev-sporteev-components-0.0.9.tgz
   ```

## Package Publishing

1. **Version Management**

   - Use `npm version` to update version numbers
   - Follow semantic versioning (patch, minor, major)

2. **Publishing**
   ```bash
   npm run release:patch  # For bug fixes
   npm run release:minor  # For new features
   npm run release:major  # For breaking changes
   ```

## Troubleshooting

### Common Issues

1. **Style Import Errors**

   - Ensure the correct path is used in `package.json` exports
   - Verify that styles are properly bundled in `dist/assets/style.css`
   - Check that the consuming project has Tailwind CSS configured

2. **Build Failures**

   - Check TypeScript errors
   - Verify all dependencies are installed
   - Ensure Vite configuration is correct

3. **Component Styling Issues**
   - Verify Tailwind classes are properly applied
   - Check for CSS conflicts in the consuming project
   - Ensure styles are properly imported

## Best Practices

1. **Component Development**

   - Use Tailwind classes for styling
   - Keep components modular and reusable
   - Document component props and usage

2. **Style Management**

   - Use Tailwind's utility classes when possible
   - Create custom components for complex styles
   - Maintain consistent naming conventions

3. **Build Process**
   - Test components in Storybook before building
   - Verify types and styles after building
   - Test the package locally before publishing
