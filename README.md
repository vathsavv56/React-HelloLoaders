# Hello Loaders

A collection of SVG loading animations where each one traces the word *hello*
in a different language and script. Every loader is a single self-contained
React file — drop it into your project and it works.

## Using a loader

1. Open the directory and pick a language.
2. Switch to the **Code** tab.
3. Click **Copy**.
4. Save it as `components/Loaders/<Name>Loader.tsx` and import it.

```tsx
import EnglishLoader from "./components/Loaders/EnglishLoader";

export function App() {
  return <EnglishLoader />;
}
```

That's it. There is nothing to install.

## What a loader does

The SVG carries one or more `<path>` elements. On mount the component measures
each path with `getTotalLength()`, sets `stroke-dasharray` and
`stroke-dashoffset` to that length, and then animates the offset to zero with
CSS keyframes. Paths are staggered slightly so the word appears to be written
in stroke order.

Three details are worth knowing if you edit one:

- **`totalDrawDuration`** (default `4.8`) is divided across all paths. Adding
  paths makes each individual stroke faster.
- **`strokeGap`** (default `0.08`) is the pause between consecutive strokes.
- **`strokeWidth`** is set on every path. Changing it on one path only will
  make that stroke look heavier.

Each loader injects a small `<style>` tag. The keyframe and the `path` rule are
both namespaced (`hl-draw`, `.hl-loader`) so they cannot collide with your own
styles or with a second instance of the component. You can delete the tag and
move the rules into your own stylesheet if you prefer.

The root element is `h-screen` with a black background, so the loader fills the
viewport when rendered on its own. Inside a smaller box, give the wrapper a
height and the loader will fill that instead.

## Requirements

React and Tailwind CSS v4. Nothing else.

## Running the showcase

```bash
bun install
bun run dev
```

The showcase is a Vite app. It discovers loaders with `import.meta.glob`, so a
new file in `src/loaders/` appears in the directory, gets a route, and shows up
in search with no further wiring.

Note that a loader must be exported as a default React component. Two placeholder
files (`LuffyLoader.tsx`, `Vathsavv56Loader.tsx`) return `null` and are
explicitly excluded from the registry.

## Deployment

`vercel.json` rewrites all paths to `index.html` so that direct hits on routes
like `/english` are handled by React Router rather than 404ing.
