import { createBrowserRouter, RouterProvider, Link } from "react-router";

import ArabicLoader from "./loaders/ArabicLoader";
import BulgarianLoader from "./loaders/BulgarianLoader";
import CatlanLoader from "./loaders/CatlanLoader";
import ChineseHongKongLoader from "./loaders/ChineseHongKongLoader";
import ChineseSimplifiedLoader from "./loaders/ChineseSimplifiedLoader";
import ChineseTraditionalLoader from "./loaders/ChineseTraditionalLoader";
import CroatianLoader from "./loaders/CroatianLoader";
import CzechLoader from "./loaders/CzechLoader";
import DanishLoader from "./loaders/DanishLoader";
import DutchLoader from "./loaders/DutchLoader";
import EnglishLoader from "./loaders/EnglishLoader";
import FinnishLoader from "./loaders/FinnishLoader";
import FrenchLoader from "./loaders/FrenchLoader";
import GermanLoader from "./loaders/GermanLoader";
import GreekLoader from "./loaders/GreekLoader";
import HebrewLoader from "./loaders/HebrewLoader";
import HindiLoader from "./loaders/HindiLoader";
import HungarianLoader from "./loaders/HungarianLoader";
import IndoneshianLoader from "./loaders/IndoneshianLoader";
import ItalianLoader from "./loaders/ItalianLoader";
import JapaneseLoader from "./loaders/JapaneseLoader";
import KazakhLoader from "./loaders/KazakhLoader";
import KoreanLoader from "./loaders/KoreanLoader";
import MalayLoader from "./loaders/MalayLoader";
import NorwegianBokmaiLoader from "./loaders/NorwegianBokmaiLoader";
import PolishLoader from "./loaders/PolishLoader";
import PortugeseBrazilLoader from "./loaders/PortugeseBrazilLoader";
import PortugeseLoader from "./loaders/PortugeseLoader";
import RomanianLoader from "./loaders/RomanianLoader";
import RussianLoader from "./loaders/RussianLoader";
import SlovakLoader from "./loaders/SlovakLoader";
import SpanishLoader from "./loaders/SpanishLoader";
import SwedishLoader from "./loaders/SwedishLoader";
import ThaiLoader from "./loaders/ThaiLoader";
import TurkishLoader from "./loaders/TurkishLoader";
import UkranianLoader from "./loaders/UkranianLoader";
import VietnameseLoader from "./loaders/VietnameseLoader";

const loaders = [
  { name: "Arabic", path: "arabic", element: <ArabicLoader /> },
  { name: "Bulgarian", path: "bulgarian", element: <BulgarianLoader /> },
  { name: "Catalan", path: "catlan", element: <CatlanLoader /> },
  { name: "Chinese (Hong Kong)", path: "chinese-hong-kong", element: <ChineseHongKongLoader /> },
  { name: "Chinese (Simplified)", path: "chinese-simplified", element: <ChineseSimplifiedLoader /> },
  { name: "Chinese (Traditional)", path: "chinese-traditional", element: <ChineseTraditionalLoader /> },
  { name: "Croatian", path: "croatian", element: <CroatianLoader /> },
  { name: "Czech", path: "czech", element: <CzechLoader /> },
  { name: "Danish", path: "danish", element: <DanishLoader /> },
  { name: "Dutch", path: "dutch", element: <DutchLoader /> },
  { name: "English", path: "english", element: <EnglishLoader /> },
  { name: "Finnish", path: "finnish", element: <FinnishLoader /> },
  { name: "French", path: "french", element: <FrenchLoader /> },
  { name: "German", path: "german", element: <GermanLoader /> },
  { name: "Greek", path: "greek", element: <GreekLoader /> },
  { name: "Hebrew", path: "hebrew", element: <HebrewLoader /> },
  { name: "Hindi", path: "hindi", element: <HindiLoader /> },
  { name: "Hungarian", path: "hungarian", element: <HungarianLoader /> },
  { name: "Indonesian", path: "indoneshian", element: <IndoneshianLoader /> },
  { name: "Italian", path: "italian", element: <ItalianLoader /> },
  { name: "Japanese", path: "japanese", element: <JapaneseLoader /> },
  { name: "Kazakh", path: "kazakh", element: <KazakhLoader /> },
  { name: "Korean", path: "korean", element: <KoreanLoader /> },
  { name: "Malay", path: "malay", element: <MalayLoader /> },
  { name: "Norwegian (Bokmål)", path: "norwegian-bokmai", element: <NorwegianBokmaiLoader /> },
  { name: "Polish", path: "polish", element: <PolishLoader /> },
  { name: "Portuguese (Brazil)", path: "portugese-brazil", element: <PortugeseBrazilLoader /> },
  { name: "Portuguese", path: "portugese", element: <PortugeseLoader /> },
  { name: "Romanian", path: "romanian", element: <RomanianLoader /> },
  { name: "Russian", path: "russian", element: <RussianLoader /> },
  { name: "Slovak", path: "slovak", element: <SlovakLoader /> },
  { name: "Spanish", path: "spanish", element: <SpanishLoader /> },
  { name: "Swedish", path: "swedish", element: <SwedishLoader /> },
  { name: "Thai", path: "thai", element: <ThaiLoader /> },
  { name: "Turkish", path: "turkish", element: <TurkishLoader /> },
  { name: "Ukrainian", path: "ukranian", element: <UkranianLoader /> },
  { name: "Vietnamese", path: "vietnamese", element: <VietnameseLoader /> },
];

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
        
        <p className="text-xl sm:text-2xl text-white/60 mb-12 leading-relaxed max-w-2xl mx-auto">
          A premium open-source collection of 37 handcrafted SVG loading animations from around the world. Elevate your project's first impression.
        </p>
        
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
        <header className="mb-12 border-b border-white/10 pb-8 flex sm:flex-row flex-col items-start sm:items-center justify-between gap-6">
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
              Customization
            </h2>
            <div className="p-8 bg-white/5 border border-white/10 rounded-2xl shadow-xl space-y-4 text-white/70 leading-relaxed">
              <p>
                To adjust timing, modify the <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-jmono text-sm">totalDuration</code> constant uniformly defined inside the <code>useEffect</code> hook of any loader file.
              </p>
              <p>
                Colors mapping can easily be altered directly via the inline Tailwind classes like <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-jmono text-sm">bg-white</code> and <code className="bg-white/10 px-1.5 py-0.5 rounded text-white font-jmono text-sm">text-white</code>, mapped naturally in the JSX return body.
              </p>
              <p className="pt-4 border-t border-white/10">
                You can browse styling variants in our <Link to="/menu" className="text-purple-400 hover:text-purple-300 underline underline-offset-4">Interactive Menu</Link>.
              </p>
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
    element: (
      <div className="relative">
        <Link 
          to="/menu" 
          className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all text-sm font-medium font-manrope flex items-center gap-2 border border-white/10 hover:border-white/20"
        >
          <span>←</span> Back to Menu
        </Link>
        {loader.element}
      </div>
    ),
  })),
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
