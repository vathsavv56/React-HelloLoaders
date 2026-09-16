import { useState, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCheck,
  Copy,
  ExternalLink,
  Layers3,
  Search,
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
          className="text-white/80"
        >
          {line.slice(lastIndex, start)}
        </span>,
      );
      tokenIndex += 1;
    }

    let className = "text-white/80";

    if (token.startsWith("//")) {
      className = "text-white/40 italic";
    } else if (
      (token.startsWith('"') && token.endsWith('"')) ||
      (token.startsWith("'") && token.endsWith("'")) ||
      (token.startsWith("`") && token.endsWith("`"))
    ) {
      className = "text-green-300";
    } else if (TSX_KEYWORDS.has(token)) {
      className = "text-pink-400";
    } else if (/^<\/?[A-Za-z][A-Za-z0-9]*$/.test(token)) {
      className = "text-purple-300";
    } else if (/^\d+(?:\.\d+)?$/.test(token)) {
      className = "text-blue-300";
    } else if (/^[{}()[\].,;<>]$/.test(token)) {
      className = "text-white/50";
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
      <span key={`${lineIndex}-tail`} className="text-white/80">
        {line.slice(lastIndex)}
      </span>,
    );
  }

  if (nodes.length === 0) {
    nodes.push(<span key={`${lineIndex}-empty`}>{"\u00A0"}</span>);
  }

  return nodes;
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

const AppHeader = () => (
  <header className="flex min-h-20 items-center justify-between border-b border-[#e5e5e5]">
    <Link to="/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-[#171717]">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#171717] text-white">
        <Layers3 size={16} strokeWidth={2.2} />
      </span>
      Hello Loaders
    </Link>
    <nav className="hidden items-center gap-7 text-sm text-[#737373] sm:flex">
      <Link to="/menu" className="font-medium text-[#171717]">Directory</Link>
      <a href="https://github.com/vathsavv56" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#171717]">
        GitHub <ExternalLink size={13} />
      </a>
    </nav>
    <Link to="/menu" className="inline-flex items-center gap-2 rounded-md border border-[#d4d4d4] bg-white px-3.5 py-2 text-xs font-semibold text-[#404040] transition-colors hover:border-[#171717] hover:text-[#171717]">
      Browse collection <ArrowRight size={14} />
    </Link>
  </header>
);

const Menu = () => {
  const [query, setQuery] = useState("");
  const filteredLoaders = loaders.filter((loader) =>
    loader.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-manrope text-[#171717]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AppHeader />
        <main className="py-12 sm:py-16">
          <div className="flex flex-col justify-between gap-8 border-b border-[#e5e5e5] pb-10 sm:flex-row sm:items-end">
            <div>
              <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#737373] transition-colors hover:text-[#171717]">
                <ArrowLeft size={15} /> Back home
              </Link>
              <p className="mb-3 font-jmono text-[11px] uppercase tracking-[0.18em] text-[#a3a3a3]">Collection / {loaders.length} components</p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Loader directory</h1>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#737373]">Explore handcrafted SVG loading states, each ready to preview and copy into a React project.</p>
            </div>
            <label className="flex w-full items-center gap-3 border border-[#d4d4d4] bg-white px-3.5 py-3 text-sm text-[#737373] shadow-sm sm:max-w-xs">
              <Search size={16} className="shrink-0 text-[#a3a3a3]" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a language" className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#a3a3a3]" />
            </label>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#e5e5e5] bg-[#e5e5e5] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredLoaders.map((loader, index) => (
              <Link key={loader.path} to={`/${loader.path}`} className="group flex min-h-28 items-center justify-between bg-white px-5 py-4 transition-colors hover:bg-[#f5f5f5]">
                <span className="flex items-center gap-3 text-sm font-semibold text-[#404040]">
                  <span className="font-jmono text-[10px] font-normal text-[#a3a3a3]">{String(index + 1).padStart(2, "0")}</span>
                  {loader.name}
                </span>
                <ArrowRight size={16} className="text-[#a3a3a3] transition-transform group-hover:translate-x-1 group-hover:text-[#171717]" />
              </Link>
            ))}
          </div>
          {filteredLoaders.length === 0 && <p className="py-16 text-center text-sm text-[#737373]">No loaders match “{query}”.</p>}
        </main>
      </div>
    </div>
  );
};

const LoaderShowcase = ({ loader }: { loader: (typeof loaders)[0] }) => {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(loader.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-manrope text-[#171717] selection:bg-[#d4d4d4]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <AppHeader />
        <main className="space-y-8 py-12 sm:py-16">
        {/* Showcase Header */}
        <header className="flex flex-col justify-between gap-8 border-b border-[#e5e5e5] pb-8 sm:flex-row sm:items-end">
          <div className="space-y-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#737373] transition-colors hover:text-[#171717]"
            >
              <ArrowLeft size={15} /> Back to directory
            </Link>
            <p className="font-jmono text-[11px] uppercase tracking-[0.18em] text-[#a3a3a3]">Component preview</p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {loader.name} Loader
            </h1>
            <p className="text-[#737373]">A handwritten SVG loading animation, ready to copy into your project.</p>
          </div>

          <div className="mt-4 flex w-fit border border-[#d4d4d4] bg-white p-1 shadow-sm sm:mt-0">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === "preview"
                  ? "bg-[#171717] text-white"
                  : "text-[#737373] hover:text-[#171717]"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-5 py-2 text-sm font-semibold transition-all ${
                activeTab === "code"
                  ? "bg-[#171717] text-white"
                  : "text-[#737373] hover:text-[#171717]"
              }`}
            >
              Code
            </button>
          </div>
        </header>

        {/* Live Preview / Code Box */}
        <div className="relative h-[520px] overflow-hidden border border-[#d4d4d4] bg-white shadow-[0_18px_45px_-28px_rgba(23,23,23,0.45)] sm:h-[600px]">
          {activeTab === "preview" ? (
            <div className="absolute inset-0 h-full w-full [&>div]:!m-0 [&>div]:!min-h-0 [&>div]:!h-full [&>div]:!w-full [&>div]:!bg-black">
              <loader.Component />
            </div>
          ) : (
            <div className="absolute inset-0 h-full w-full overflow-y-auto overflow-x-auto bg-[#20201f] scrollbar-thin scrollbar-thumb-white/10">
              <div className="pointer-events-none sticky right-0 top-0 z-10 flex w-full justify-end bg-gradient-to-b from-[#20201f] to-transparent p-4">
                <button
                  className="pointer-events-auto inline-flex items-center gap-2 border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                  onClick={copyCode}
                >
                  {copied ? <CheckCheck size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy code"}
                  Copy Code
                </button>
              </div>
              <pre className="m-0 whitespace-pre bg-transparent px-5 pb-8 pt-4 font-jmono text-[0.8rem] leading-[1.6] text-white/80 sm:px-8 sm:text-[0.875rem]">
                <code className="block">
                  {loader.code.split("\n").map((line, lineIndex) => (
                    <span
                      key={`line-${lineIndex}`}
                      className="block whitespace-pre"
                    >
                      {renderHighlightedLine(line, lineIndex)}
                    </span>
                  ))}
                </code>
              </pre>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#e5e5e5] bg-[#e5e5e5] sm:grid-cols-2">
          <div className="space-y-2 bg-white p-6">
            <p className="text-sm font-medium text-[#737373]">Component path</p>
            <p className="break-all font-jmono text-sm text-[#404040]">
              src/loaders/{loader.id}.tsx
            </p>
          </div>
          <div className="space-y-3 bg-white p-6">
            <p className="text-sm font-medium text-[#737373]">Dependencies</p>
            <div className="flex flex-wrap gap-2">
              <span className="border border-[#d4d4d4] bg-[#fafafa] px-2.5 py-1 font-jmono text-xs text-[#404040]">
                react
              </span>
              <span className="border border-[#d4d4d4] bg-[#fafafa] px-2.5 py-1 font-jmono text-xs text-[#404040]">
                tailwindcss
              </span>
            </div>
            <p className="mt-3 border-t border-[#e5e5e5] pt-3 text-xs leading-relaxed text-[#737373]">
              Plug and play with no external animation libraries.
            </p>
          </div>
        </div>
        </main>
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
  ...loaders.map((loader) => ({
    path: `/${loader.path}`,
    element: <LoaderShowcase loader={loader} />,
  })),
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
