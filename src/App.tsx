import { useState, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router";
import {
  ArrowRight,
  Check,
  Code2,
  ExternalLink,
  Layers3,
  Sparkles,
  FolderKanban,
  Copy,
  Eye,
  Star,
  Workflow,
} from "lucide-react";

// Dynamically import all loader modules (filtering out standalone text demos)
const loaderModules = import.meta.glob(
  [
    "./loaders/*.tsx",
    "!./loaders/Vathsavv56Loader.tsx",
    "!./loaders/LuffyLoader.tsx",
  ],
  { eager: true },
) as Record<string, { default: React.ComponentType }>;

// Dynamically import all raw source codes of the loaders
const loaderSources = import.meta.glob(
  [
    "./loaders/*.tsx",
    "!./loaders/Vathsavv56Loader.tsx",
    "!./loaders/LuffyLoader.tsx",
  ],
  { eager: true, query: "?raw", import: "default" },
) as Record<string, string>;

// Transform the raw paths into an array of route objects
const loaders = Object.keys(loaderModules)
  .map((filePath) => {
    const fileName = filePath.split("/").pop()?.replace(".tsx", "") || "";
    // Convert PascalCase to Readable Name Note: ChineseHongKongLoader -> Chinese Hong Kong
    const name =
      fileName
        .replace("Loader", "")
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .trim() || fileName;

    // URL slug
    const path = fileName.replace("Loader", "").toLowerCase();

    return {
      id: fileName,
      name,
      path,
      Component: loaderModules[filePath].default,
      code: loaderSources[filePath],
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const TSX_KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "function",
  "return",
  "const",
  "let",
  "var",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "class",
  "extends",
  "type",
  "interface",
  "as",
  "async",
  "await",
]);

const TSX_TOKEN_REGEX =
  /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b[A-Za-z_][A-Za-z0-9_]*\b|<\/?[A-Za-z][A-Za-z0-9]*|[{}()[\].,;<>]|\b\d+(?:\.\d+)?\b)/g;

const renderHighlightedLine = (
  line: string,
  lineIndex: number,
): ReactNode[] => {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let tokenIndex = 0;

  for (const match of line.matchAll(TSX_TOKEN_REGEX)) {
    const token = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(
        <span
          key={`${lineIndex}-plain-${tokenIndex}`}
          className="text-slate-300"
        >
          {line.slice(lastIndex, start)}
        </span>,
      );
      tokenIndex += 1;
    }

    let className = "text-slate-300";

    if (token.startsWith("//")) {
      className = "text-slate-500 italic";
    } else if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith("`") && token.endsWith("`"))
    ) {
      className = "text-emerald-300";
    } else if (TSX_KEYWORDS.has(token)) {
      className = "text-fuchsia-300";
    } else if (/^<\/?[A-Za-z][A-Za-z0-9]*$/.test(token)) {
      className = "text-violet-300";
    } else if (/^\d+(?:\.\d+)?$/.test(token)) {
      className = "text-sky-300";
    } else if (/^[{}()[\].,;<>]$/.test(token)) {
      className = "text-slate-500";
    }

    nodes.push(
      <span key={`${lineIndex}-token-${tokenIndex}`} className={className}>
        {token}
      </span>,
    );

    tokenIndex += 1;
    lastIndex = start + token.length;
  }

  if (lastIndex < line.length) {
    nodes.push(
      <span key={`${lineIndex}-tail`} className="text-slate-300">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  if (nodes.length === 0) {
    nodes.push(<span key={`${lineIndex}-empty`}>{"\u00A0"}</span>);
  }

  return nodes;
};

const CodePanel = ({
  title,
  subtitle,
  code,
}: {
  title: string;
  subtitle: string;
  code: string;
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f1d] shadow-[0_20px_80px_-45px_rgba(124,58,237,0.75)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 sm:px-5">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-jmono text-emerald-200">
            TSX
          </span>
        </div>
      </div>
      <pre className="m-0 max-h-[28rem] overflow-auto bg-[#090d1a] p-4 text-[0.82rem] leading-6 sm:p-5">
        <code className="block">
          {code.split("\n").map((line, lineIndex) => (
            <span key={`line-${lineIndex}`} className="grid grid-cols-[40px_1fr] gap-4">
              <span className="select-none text-right text-slate-600">
                {String(lineIndex + 1).padStart(2, "0")}
              </span>
              <span className="block whitespace-pre">{renderHighlightedLine(line, lineIndex)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#171717] font-manrope">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-5 sm:px-8">
        <header className="flex h-20 items-center justify-between border-b border-[#e5e5e5]">
          <Link to="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-white">
              <Layers3 size={16} strokeWidth={2.2} />
            </span>
            Hello Loaders
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-[#737373] sm:flex">
            <Link to="/menu" className="transition-colors hover:text-[#171717]">Directory</Link>
            <Link to="/docs" className="transition-colors hover:text-[#171717]">Documentation</Link>
            <a href="https://github.com/vathsavv56" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#171717]">
              GitHub <ExternalLink size={13} />
            </a>
          </nav>
          <Link to="/menu" className="inline-flex items-center gap-2 rounded-md bg-[#171717] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#404040]">
            Browse collection <ArrowRight size={14} />
          </Link>
        </header>

        <main className="flex flex-1 flex-col justify-center py-16 sm:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
            <section>
              <div className="mb-7 inline-flex items-center gap-2 border border-[#d4d4d4] bg-white px-3 py-1.5 text-xs font-medium text-[#525252] shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Open source / React components
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-[#171717] sm:text-7xl">
                Loading states,<br />made <span className="text-[#a3a3a3]">human.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#737373] sm:text-lg">
                A carefully curated collection of {loaders.length} handcrafted SVG loaders inspired by languages and cultures from around the world. Copy a component and ship a better first impression.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/menu" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#404040]">
                  Explore the directory <ArrowRight size={16} />
                </Link>
                <Link to="/docs" className="inline-flex items-center justify-center gap-2 rounded-md border border-[#d4d4d4] bg-white px-5 py-3 text-sm font-semibold text-[#404040] transition-colors hover:bg-[#f5f5f5]">
                  <Code2 size={16} /> Read the docs
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#e5e5e5] pt-5 text-xs text-[#737373]">
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Pure SVG and CSS</span>
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-emerald-600" /> No dependencies</span>
                <span className="inline-flex items-center gap-2"><Check size={14} className="text-emerald-600" /> Copy and paste</span>
              </div>
            </section>

            <section className="relative border border-[#d4d4d4] bg-white p-2 shadow-[0_18px_45px_-28px_rgba(23,23,23,0.45)]">
              <div className="border border-[#e5e5e5] bg-[#fafafa] p-5 sm:p-7">
                <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-4">
                  <div>
                    <p className="text-sm font-semibold text-[#262626]">Loader directory</p>
                    <p className="mt-1 text-xs text-[#a3a3a3]">Browse the collection</p>
                  </div>
                  <span className="font-jmono text-[11px] text-[#a3a3a3]">{String(loaders.length).padStart(2, "0")} items</span>
                </div>
                <div className="mt-4 divide-y divide-[#e5e5e5] border-y border-[#e5e5e5] bg-white">
                  {loaders.slice(0, 5).map((loader, index) => (
                    <Link key={loader.path} to={`/${loader.path}`} className="group flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-[#fafafa]">
                      <span className="flex items-center gap-3 text-sm font-medium text-[#404040]">
                        <span className="font-jmono text-[10px] text-[#a3a3a3]">0{index + 1}</span>
                        {loader.name}
                      </span>
                      <ArrowRight size={15} className="text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#171717]" />
                    </Link>
                  ))}
                </div>
                <Link to="/menu" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#525252] hover:text-[#171717]">
                  View all loaders <ArrowRight size={13} />
                </Link>
              </div>
            </section>
          </div>
        </main>

        <footer className="flex flex-col gap-3 border-t border-[#e5e5e5] py-5 text-xs text-[#a3a3a3] sm:flex-row sm:items-center sm:justify-between">
          <span>Built for the moments between states.</span>
          <a href="https://github.com/vathsavv56" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#737373] hover:text-[#171717]">Open source on GitHub <ExternalLink size={13} /></a>
        </footer>
      </div>
    </div>
  );
};

const docsSnippet = `import EnglishLoader from "./components/EnglishLoader";

export default function App() {
  return (
    <main className="min-h-screen grid place-items-center bg-neutral-950">
      <EnglishLoader />
    </main>
  );
}`;

const Docs = () => {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-manrope">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-10 sm:px-8 sm:py-12">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-slate-900 to-cyan-500/10 p-7 shadow-[0_25px_90px_-50px_rgba(139,92,246,0.8)] sm:p-9">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                <Sparkles size={12} /> Integration Guide
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Documentation
              </h1>
              <p className="text-sm leading-7 text-slate-300 sm:text-base">
                Everything you need to copy a loader, drop it into your project,
                and keep your loading states clean, expressive, and consistent.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10"
            >
              <ArrowRight size={15} className="rotate-180" /> Back Home
            </Link>
          </div>
        </header>

        <main className="mt-8 grid gap-6 pb-16 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Quick Start
              </h2>
              <ol className="mt-4 space-y-4 text-sm leading-7 text-slate-300">
                <li>1. Open the directory and choose the loader that matches your brand voice.</li>
                <li>2. Copy the TSX component source from the <strong className="text-slate-100">Code</strong> tab.</li>
                <li>3. Paste it into your own component folder and import it where needed.</li>
                <li>4. Adjust strokes, colors, and speed with Tailwind utility classes.</li>
              </ol>
            </div>

            <CodePanel
              title="Usage Example"
              subtitle="Copy this pattern into your app"
              code={docsSnippet}
            />
          </section>

          <section className="space-y-4">
            {[
              {
                icon: <Workflow size={18} />,
                title: "No runtime dependency",
                desc: "Animations are built directly in SVG/CSS, so there is no animation runtime to maintain.",
              },
              {
                icon: <Star size={18} />,
                title: "Production-ready defaults",
                desc: "Components ship with sensible dimensions, legible stroke pacing, and smooth loops.",
              },
              {
                icon: <Code2 size={18} />,
                title: "Developer friendly",
                desc: "Every loader is simple TSX. Edit quickly without custom build steps or wrappers.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200">
                  {item.icon} {item.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-300">{item.desc}</p>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="min-h-screen bg-[#020617] font-manrope text-slate-100">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-violet-950/40 to-cyan-950/30 p-7 sm:p-9">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
          >
            <ArrowRight size={15} className="rotate-180" /> Back Home
          </Link>
          <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                <FolderKanban size={12} /> Directory
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Loaders Directory
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Browse all {loaders.length} handwritten loaders and jump directly into
                live preview + source for each language style.
              </p>
            </div>
            <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-4 py-2 text-xs font-jmono text-violet-100">
              {String(loaders.length).padStart(2, "0")} Components
            </span>
          </div>
        </header>

        <div className="mt-7 grid grid-cols-1 gap-4 pb-14 sm:grid-cols-2 lg:grid-cols-3">
          {loaders.map((loader, index) => (
            <Link
              key={loader.path}
              to={`/${loader.path}`}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all hover:-translate-y-1 hover:border-violet-300/40 hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-jmono text-slate-500">
                  #{String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-white/15 px-2 py-1 text-[10px] text-slate-400">
                  loader
                </span>
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{loader.name}</p>
              <p className="mt-2 text-sm text-slate-400">Open preview and inspect source code</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-200 transition-all group-hover:gap-3">
                Explore <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const LoaderShowcase = ({ loader }: { loader: (typeof loaders)[0] }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  return (
    <div className="min-h-screen bg-[#020617] px-5 py-10 font-manrope text-slate-100 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-violet-950/30 to-cyan-950/20 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                <ArrowRight size={15} className="rotate-180" /> Back to Directory
              </Link>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {loader.name} Loader
              </h1>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">
                Production-ready handwritten SVG loading animation component.
              </p>
            </div>

            <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1.5">
              <button
                onClick={() => setActiveTab("preview")}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "preview"
                    ? "bg-violet-500/30 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Eye size={15} /> Preview
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "code"
                    ? "bg-violet-500/30 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Code2 size={15} /> Code
              </button>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="min-h-[600px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0f1f] shadow-[0_30px_80px_-55px_rgba(59,130,246,0.6)]">
            {activeTab === "preview" ? (
              <div className="h-[600px] w-full [&>div]:!m-0 [&>div]:!min-h-0 [&>div]:!h-full [&>div]:!w-full [&>div]:!bg-transparent [&>div]:!p-0">
                <loader.Component />
              </div>
            ) : (
              <div className="h-[600px] overflow-auto bg-[#090d1a] p-4 sm:p-5">
                <div className="mb-4 flex justify-end">
                  <button
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
                    onClick={() => navigator.clipboard.writeText(loader.code)}
                  >
                    <Copy size={13} /> Copy Code
                  </button>
                </div>
                <CodePanel
                  title={`${loader.name}.tsx`}
                  subtitle="Source component"
                  code={loader.code}
                />
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Component Path</p>
              <p className="mt-2 break-all font-jmono text-sm text-violet-200">
                src/loaders/{loader.id}.tsx
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-200">react</span>
                <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">tailwindcss</span>
                <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">svg</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Lightweight component with no animation runtime dependency.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

// Map routes dynamically
const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/docs",
    element: <Docs />,
  },
  ...loaders.map((loader) => ({
    path: `/${loader.path}`,
    element: <LoaderShowcase loader={loader} />,
  })),
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
