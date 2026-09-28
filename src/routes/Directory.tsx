import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Search } from "lucide-react";
import { loaders, loaderCount } from "../lib/loaders";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Specimen } from "../components/Specimen";

export function Directory() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return loaders;
    return loaders.filter((loader) => loader.name.toLowerCase().includes(needle));
  }, [query]);

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 sm:px-8">
        <SiteHeader />

        <main className="flex flex-1 flex-col py-12 md:py-16">
          <div className="flex flex-col gap-6 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-4">
                {loaderCount} components
              </p>
              <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                Directory
              </h1>
            </div>

            <label className="flex w-full items-center gap-2.5 border-b border-line pb-2 transition-colors focus-within:border-ink-2 sm:max-w-[240px]">
              <Search size={14} className="shrink-0 text-ink-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Filter by name"
                aria-label="Filter loaders by name"
                className="min-w-0 flex-1 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-4"
              />
            </label>
          </div>

          {results.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((loader) => (
                <Link
                  key={loader.slug}
                  to={`/${loader.slug}`}
                  className="group border border-line bg-panel transition-colors hover:border-ink-4"
                >
                  <Specimen className="aspect-4/3" variant="thumb" lazy>
                    <loader.Component />
                  </Specimen>

                  <div className="flex items-center justify-between border-t border-line px-3 py-2.5">
                    <span className="truncate text-[13px] text-ink-2 group-hover:text-ink">
                      {loader.name}
                    </span>
                    <span className="ml-3 shrink-0 font-mono text-[10px] text-ink-4">
                      {loader.pathCount} paths
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-24 text-center text-[14px] text-ink-3">
              Nothing matches{" "}
              <span className="text-ink">{query}</span>.
            </p>
          )}

          <div className="mt-16">
            <SiteFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
