# Hello Loaders

A premium open-source collection of beautifully handwritten SVG loading animations mapping languages from around the world. Perfect for giving your React + Tailwind CSS project a memorable first impression.

## Features

- **Zero Dependencies**: You don't need any external animation libraries like Framer Motion, GSAP, or Spring. 
- **Lightweight Native Animations**: Handcrafted heavily optimized native SVGs using `requestAnimationFrame` and CSS keyframes.
- **Copy & Paste Approach**: No `npm install` needed. You just select the loader you want, copy the raw code, drop it into your component folder, and you're good to go.
- **Fully Customizable**: Built with native SVG logic and Tailwind CSS utility classes, making it trivial to change colors, stroke widths, boundaries, and easing timing variables.

## Getting Started

1. Check out the Loaders directory from the showcase app.
2. Select your desired loader and switch to the **Code** tab.
3. Click **Copy Code**.
4. Create a new `.tsx` file in your own project (e.g., `components/Loaders/EnglishLoader.tsx`) and paste the code.

That's it!

```tsx
import EnglishLoader from './components/Loaders/EnglishLoader';

function App() {
  return (
    <div className="App">
       <EnglishLoader />
    </div>
  );
}
```

## Running the Showcase locally

The repository includes a gorgeous frontend to preview and explore all loaders dynamically.

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

## Deployment

This app is configured to be seamlessly deployed to Vercel. 
The SPA routing relies on `vercel.json` logic using rewrites to ensure direct paths (like `/docs` or `/english`) don't throw 404s and pass efficiently to the underlying React Router hierarchy.
