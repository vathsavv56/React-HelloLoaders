import { useState } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router";

// Dynamically import all loader modules (filtering out standalone text demos)
const loaderModules = import.meta.glob(['./loaders/*.tsx', '!./loaders/Vathsavv56Loader.tsx', '!./loaders/LuffyLoader.tsx'], { eager: true }) as Record<string, { default: React.ComponentType }>;

// Dynamically import all raw source codes of the loaders
const loaderSources = import.meta.glob(['./loaders/*.tsx', '!./loaders/Vathsavv56Loader.tsx', '!./loaders/LuffyLoader.tsx'], { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

// Transform the raw paths into an array of route objects
const loaders = Object.keys(loaderModules).map((filePath) => {
  const fileName = filePath.split('/').pop()?.replace('.tsx', '') || '';
  // Convert PascalCase to Readable Name Note: ChineseHongKongLoader -> Chinese Hong Kong
  const name = fileName
    .replace('Loader', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim() || fileName;
    
  // URL slug
  const path = fileName.replace('Loader', '').toLowerCase();

  return {
    id: fileName,
    name,
    path,
    Component: loaderModules[filePath].default,
    code: loaderSources[filePath]
  };
}).sort((a, b) => a.name.localeCompare(b.name));

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#08060d] text-white flex flex-col items-center justify-center font-manrope relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="z-10 text-center max-w-4xl px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide text-white/80">v1.0 Now Live</span>
        </div>
        
        <h1 className="text-6xl sm:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-purple-100 to-white/40 bg-clip-text text-transparent">
          Welcome to
          <br /> Hello Loaders
        </h1>
        
        <p className="text-xl sm:text-2xl text-white/60 mb-8 leading-relaxed max-w-2xl mx-auto">
          A premium open-source collection of {loaders.length} handcrafted SVG loading animations from around the world. Elevate your project's first impression.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-white/40 font-medium mb-12 bg-white/5 border border-white/10 w-fit mx-auto px-4 py-2 rounded-full text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
          No npm commands required. Just copy, paste, and run.
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link 
            to="/menu"
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-purple-50 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:-translate-y-1 flex items-center gap-2"
          >
            Explore Loaders <span className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link 
            to="/docs"
            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all backdrop-blur-md flex items-center gap-2 hover:-translate-y-1"
          >
            Read Docs
          </Link>
        </div>
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
            <h1 className="text-4xl font-bold tracking-tight mb-2">Documentation</h1>
            <p className="text-white/60">How to integrate Hello Loaders into your projects.</p>
          </div>
          <Link to="/" className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/70 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
            <span>←</span> Back Home
          </Link>
        </header>

        <section className="space-y-12 pb-24">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-purple-200 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 text-sm">1</span>
              Quick Start
            </h2>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl shadow-xl">
              <p className="text-white/70 mb-6 leading-relaxed">
                Our loaders are plug-and-play components using React and pure Tailwind CSS. There are zero external animation libraries to maintain.
              </p>
              <div className="bg-[#0f0c16] rounded-xl p-4 border border-white/5 overflow-x-auto">
                <code className="text-sm font-jmono text-purple-200">
                  <span className="text-white/40"># 1. Ensure you have React and Tailwind CSS v4 setup.</span><br/>
                  <br/>
                  <span className="text-white/40"># 2. Copy the desired loader from `src/loaders/*.tsx`</span><br/>
                  <span className="text-white/40">#    into your project's components directory.</span><br/>
                  <br/>
                  <span className="text-white/40"># 3. Import and use it directly</span><br/>
                  <span className="text-pink-400">import</span>{" { EnglishLoader } "}<span className="text-pink-400">from</span> <span className="text-green-300">"./components/EnglishLoader"</span>;<br/><br/>
                  <span className="text-blue-400">function</span> <span className="text-yellow-200">App</span>() {"{"}<br/>
                  {"  "}<span className="text-pink-400">return</span> {"<"}<span className="text-purple-300">EnglishLoader</span> {"/>;"}<br/>
                  {"}"}
                </code>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-purple-200 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 text-sm">2</span>
              Dependencies
            </h2>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl shadow-xl">
               <ul className="space-y-6 text-white/70">
                 <li className="flex items-start gap-4">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                   <div>
                     <strong className="text-white block font-medium mb-1 text-lg">React</strong>
                     <p className="text-sm leading-relaxed">Built for React 18+ environments using native hooks (<code>useState</code>, <code>useEffect</code>, <code>useRef</code>).</p>
                   </div>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
                   <div>
                     <strong className="text-white block font-medium mb-1 text-lg">Tailwind CSS</strong>
                     <p className="text-sm leading-relaxed">Styled entirely with utility classes. Built and tested with Tailwind v4, but backwards compatible directly with Tailwind v3.</p>
                   </div>
                 </li>
                 <li className="flex items-start gap-4">
                   <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></div>
                   <div>
                     <strong className="text-white block font-medium mb-1 text-lg">Zero Animation Libraries</strong>
                     <p className="text-sm leading-relaxed">No <code>framer-motion</code>, <code>gsap</code>, or other bloated animation libraries needed. All animations use vanilla CSS keyframes and <code>requestAnimationFrame</code> for maximum performance and minimum bundle size.</p>
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
            <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium mb-6">
              <span>←</span> Back Home
            </Link>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-white">Loaders Directory</h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Select any language below to preview its unique handwritten SVG animation completely live.
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
              <span className="font-medium text-white/80 group-hover:text-white transition-colors">{loader.name}</span>
              <span className="text-white/30 group-hover:text-white/70 transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const LoaderShowcase = ({ loader }: { loader: typeof loaders[0] }) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

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
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{loader.name} Loader</h1>
            <p className="text-white/60">A pristine handwritten SVG loading animation component.</p>
          </div>
          
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 mt-4 sm:mt-0">
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'preview' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              Preview
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
                activeTab === 'code' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              Code
            </button>
          </div>
        </header>

        {/* Live Preview / Code Box */}
        <div className="bg-[#0f0c16] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative h-[600px]">
          {activeTab === 'preview' ? (
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
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                  Copy Code
                </button>
              </div>
              <pre className="m-0 px-8 pb-8 pt-4 bg-transparent text-[0.875rem] leading-[1.5] font-jmono text-white/80 whitespace-pre">
                <code>{loader.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-2">
            <p className="text-white/40 text-sm font-medium">Component Path</p>
            <p className="text-purple-200 font-jmono text-sm break-all">src/loaders/{loader.id}.tsx</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-3">
            <p className="text-white/40 text-sm font-medium">Dependencies</p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-blue-500/10 text-blue-300 rounded-md text-xs font-jmono border border-blue-500/20 shadow-sm">react</span>
              <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-300 rounded-md text-xs font-jmono border border-cyan-500/20 shadow-sm">tailwindcss</span>
            </div>
            <p className="text-white/40 text-xs mt-3 border-t border-white/5 pt-3 leading-relaxed">
              Plug and play. Zero external animation libraries (no framer-motion/gsap).
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
