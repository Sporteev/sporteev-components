# @sporteev/sporteev-components

A reusable React component library for Sporteev projects, built with Tailwind CSS.

## Installation

Install the package and its peer dependencies:

```bash
npm install @sporteev/sporteev-components
```

## Usage

1. **Configure Tailwind CSS**

Make sure your project is set up with Tailwind CSS. If not, follow the [Tailwind installation guide](https://tailwindcss.com/docs/installation).

Update your `tailwind.config.js` to include the component library:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@sporteev/sporteev-components/dist/**/*.{js,jsx,ts,tsx}",
  ],
  // ...your theme and plugins
};
```

2. **Use the components**

```jsx
import { Button, InfoBox, Modal } from "@sporteev/sporteev-components";

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <InfoBox variant="info">This is an info box</InfoBox>
    </div>
  );
}
```

## Development

- Run `npm run dev` to start the development server.
- Run `npm run build` to build the library.
- Run `npm run storybook` to develop and preview components in isolation.

## Publishing

- Use `npm run release:patch`, `npm run release:minor`, or `npm run release:major` to version and publish the package.

## License

MIT
