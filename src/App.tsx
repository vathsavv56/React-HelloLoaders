import { useState, type ReactNode } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router";
import { ArrowRight, Check, Code2, ExternalLink, Layers3 } from "lucide-react";

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

const Docs = () => {
  return (
    <div className="min-h-screen bg-[#08060d] text-white p-6 sm:p-12 font-manrope selection:bg-white/20">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-white/10 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Documentation
            </h1>
            <p className="text-white/60">
              How to integrate Hello Loaders into your projects.
            </p>
          </div>
          <Link
            to="/"
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <span>←</span> Back Home
          </Link>
        </header>

        <section className="space-y-12 pb-24">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-purple-200 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                1
              </span>
              Quick Start
            </h2>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl shadow-xl">
              <p className="text-white/70 mb-6 leading-relaxed">
                Our loaders are plug-and-play components using React and pure
                Tailwind CSS. There are zero external animation libraries to
                maintain.
              </p>
              <div className="bg-[#0f0c16] rounded-xl p-4 border border-white/5 overflow-x-auto">
                <code className="text-sm font-jmono text-purple-200">
                  <span className="text-white/40">
                    # 1. Ensure you have React and Tailwind CSS v4 setup.
                  </span>
                  <br />
                  <br />
                  <span className="text-white/40">
                    # 2. Copy the desired loader from `src/loaders/*.tsx`
                  </span>
                  <br />
                  <span className="text-white/40">
                    # into your project's components directory.
                  </span>
                  <br />
                  <br />
                  <span className="text-white/40">
                    # 3. Import and use it directly
                  </span>
                  <br />
                  <span className="text-pink-400">import</span>
                  {" { EnglishLoader } "}
                  <span className="text-pink-400">from</span>{" "}
                  <span className="text-green-300">
                    "./components/EnglishLoader"
                  </span>
                  ;<br />
                  <br />
                  <span className="text-blue-400">function</span>{" "}
                  <span className="text-yellow-200">App</span>() {"{"}
                  <br />
                  {"  "}
                  <span className="text-pink-400">return</span> {"<"}
                  <span className="text-purple-300">EnglishLoader</span> {"/>;"}
                  <br />
                  {"}"}
                </code>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-purple-200 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                2
              </span>
              Dependencies
            </h2>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl shadow-xl">
              <ul className="space-y-6 text-white/70">
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                  <div>
                    <strong className="text-white block font-medium mb-1 text-lg">
                      React
                    </strong>
                    <p className="text-sm leading-relaxed">
                      Built for React 18+ environments using native hooks (
                      <code>useState</code>, <code>useEffect</code>,{" "}
                      <code>useRef</code>).
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                  <div>
                    <strong className="text-white block font-medium mb-1 text-lg">
                      Tailwind CSS
                    </strong>
                    <p className="text-sm leading-relaxed">
                      Styled entirely with utility classes. Built and tested
                      with Tailwind v4, but backwards compatible directly with
                      Tailwind v3.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>
                  <div>
                    <strong className="text-white block font-medium mb-1 text-lg">
                      Zero Animation Libraries
                    </strong>
                    <p className="text-sm leading-relaxed">
                      No <code>framer-motion</code>, <code>gsap</code>, or other
                      bloated animation libraries needed. All animations use
                      vanilla CSS keyframes and{" "}
                      <code>requestAnimationFrame</code> for maximum performance
                      and minimum bundle size.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Menu = () => {
  return (
    <div className="min-h-screen bg-[#08060d] text-white p-6 sm:p-12 font-manrope selection:bg-white/20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium mb-6"
            >
              <span>←</span> Back Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">
              Loaders Directory
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Select any language below to preview its unique handwritten SVG
              animation completely live.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-24">
          {loaders.map((loader) => (
            <Link
              key={loader.path}
              to={`/${loader.path}`}
              className="px-5 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 transition-all flex items-center justify-between group"
            >
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">
                {loader.name}
              </span>
              <span className="text-white/30 group-hover:text-white/70 transition-colors">
                →
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
    <div className="min-h-screen bg-[#08060d] text-white p-6 sm:p-12 font-manrope selection:bg-white/20">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Showcase Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
            >
              <span>←</span> Back to Directory
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {loader.name} Loader
            </h1>
            <p className="text-white/60">
              A pristine handwritten SVG loading animation component.
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 mt-4 sm:mt-0">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "preview"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === "code"
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              Code
            </button>
          </div>
        </header>

        {/* Live Preview / Code Box */}
        <div className="bg-[#0f0c16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative h-[600px]">
          {activeTab === "preview" ? (
            <div className="h-full w-full absolute inset-0 [&>div]:!h-full [&>div]:!w-full [&>div]:!bg-transparent [&>div]:!m-0 [&>div]:!p-0 [&>div]:!min-h-0">
              <loader.Component />
            </div>
          ) : (
            <div className="h-full w-full absolute inset-0 overflow-y-auto overflow-x-auto bg-[#1e1e1e] scrollbar-thin scrollbar-thumb-white/10">
              <div className="sticky top-0 right-0 w-full flex justify-end p-4 bg-gradient-to-b from-[#1e1e1e] to-transparent z-10 pointer-events-none">
                <button
                  className="pointer-events-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2 rounded-lg text-xs font-jmono border border-white/10 backdrop-blur-md shadow-xl"
                  onClick={() => navigator.clipboard.writeText(loader.code)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy Code
                </button>
              </div>
              <pre className="m-0 px-8 pb-8 pt-4 bg-transparent text-[0.875rem] leading-[1.5] font-jmono text-white/80 whitespace-pre">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <p className="text-white/40 text-sm font-medium">Component Path</p>
            <p className="text-purple-200 font-jmono text-sm break-all">
              src/loaders/{loader.id}.tsx
            </p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3">
            <p className="text-white/40 text-sm font-medium">Dependencies</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-md text-xs font-jmono border border-blue-500/20 shadow-sm">
                react
              </span>
              <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-md text-xs font-jmono border border-cyan-500/20 shadow-sm">
                tailwindcss
              </span>
            </div>
            <p className="text-white/40 text-xs mt-3 border-t border-white/5 pt-3 leading-relaxed">
              Plug and play. Zero external animation libraries (no
              framer-motion/gsap).
            </p>
          </div>
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
