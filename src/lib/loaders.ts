import type { ComponentType } from "react";

export type Loader = {
  /** File stem, e.g. `ChineseHongKongLoader` */
  id: string;
  /** Display label, e.g. `Chinese Hong Kong` */
  name: string;
  /** URL segment. Kept derived from the filename so existing links survive. */
  slug: string;
  Component: ComponentType;
  /** Raw file source, as shown in the Code tab. */
  code: string;
  /** Facts read back out of the source so the UI never has to invent them. */
  pathCount: number;
  strokeWidth: string | null;
  viewBox: string | null;
  drawDuration: number | null;
};

const modules = import.meta.glob(
  [
    "../loaders/*.tsx",
    "!../loaders/Vathsavv56Loader.tsx",
    "!../loaders/LuffyLoader.tsx",
  ],
  { eager: true },
) as Record<string, { default: ComponentType }>;

const sources = import.meta.glob(
  [
    "../loaders/*.tsx",
    "!../loaders/Vathsavv56Loader.tsx",
    "!../loaders/LuffyLoader.tsx",
  ],
  { eager: true, query: "?raw", import: "default" },
) as Record<string, string>;

/** The exported component names already spell these correctly; the filenames
 *  do not. Display names are corrected, slugs are left alone. */
const DISPLAY_NAMES: Record<string, string> = {
  CatlanLoader: "Catalan",
  IndoneshianLoader: "Indonesian",
  NorwegianBokmaiLoader: "Norwegian",
  PortugeseBrazilLoader: "Portuguese Brazil",
  PortugeseLoader: "Portuguese",
  UkranianLoader: "Ukrainian",
};

const count = (source: string, pattern: RegExp) =>
  source.match(pattern)?.length ?? 0;

const capture = (source: string, pattern: RegExp) =>
  source.match(pattern)?.[1] ?? null;

export const loaders: Loader[] = Object.keys(modules)
  .map((filePath) => {
    const id = filePath.split("/").pop()?.replace(".tsx", "") ?? "";
    const code = sources[filePath] ?? "";

    return {
      id,
      name:
        DISPLAY_NAMES[id] ??
        id
          .replace("Loader", "")
          .replace(/([a-z])([A-Z])/g, "$1 $2")
          .trim(),
      slug: id.replace("Loader", "").toLowerCase(),
      Component: modules[filePath].default,
      code,
      pathCount: count(code, /<path\b/g),
      strokeWidth: capture(code, /strokeWidth="([\d.]+)"/),
      viewBox: capture(code, /viewBox="([^"]+)"/),
      drawDuration: (() => {
        const raw = capture(code, /totalDrawDuration\s*=\s*([\d.]+)/);
        return raw === null ? null : Number(raw);
      })(),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export const loaderCount = loaders.length;
