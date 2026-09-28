import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { type Loader } from "../lib/loaders";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Specimen } from "../components/Specimen";
import { CodeBlock } from "../components/CodeBlock";

type Tab = "preview" | "code";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "preview", label: "Preview" },
  { id: "code", label: "Code" },
];

/** The loader arrives as a prop: routes are registered one per loader, so
 *  there is no `:slug` param to read back out of `useParams`. */
export function Showcase({ loader }: { loader: Loader }) {
  const [tab, setTab] = useState<Tab>("preview");

  const meta: Array<{ label: string; value: string }> = [
    { label: "File", value: `src/loaders/${loader.id}.tsx` },
    { label: "Paths", value: String(loader.pathCount) },
    { label: "Stroke", value: loader.strokeWidth ?? "—" },
    { label: "viewBox", value: loader.viewBox ?? "—" },
    {
      label: "Draw time",
      value: loader.drawDuration ? `${loader.drawDuration}s` : "—",
    },
    { label: "Dependencies", value: "react, tailwindcss" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 sm:px-8">
        <SiteHeader />

        <main className="flex flex-1 flex-col py-10 md:py-14">
          <Link
            to="/menu"
            className="inline-flex w-fit items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink"
          >
            <ArrowLeft size={13} />
            Directory
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[2rem] font-semibold tracking-[-0.02em] text-ink sm:text-[2.4rem]">
                {loader.name}
              </h1>
              <p className="mt-2 font-mono text-[12px] text-ink-4">
                /{loader.slug}
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Loader view"
              className="flex w-fit border border-line"
            >
              {TABS.map(({ id, label }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    onClick={() => setTab(id)}
                    className={`px-4 py-2 text-[13px] font-medium transition-colors ${
                      active
                        ? "bg-ink text-paper"
                        : "text-ink-3 hover:bg-line-soft hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 aspect-3/2 min-h-[300px] border border-line">
            {tab === "preview" ? (
              <Specimen className="h-full w-full">
                <loader.Component />
              </Specimen>
            ) : (
              <CodeBlock code={loader.code} filename={`${loader.id}.tsx`} />
            )}
          </div>

          <dl className="mt-px grid grid-cols-2 border-x border-b border-line sm:grid-cols-3">
            {meta.map((item) => (
              <div
                key={item.label}
                className="border-t border-line px-4 py-4 sm:border-t-0 sm:border-l sm:first:border-l-0"
              >
                <dt className="text-[11px] text-ink-4">{item.label}</dt>
                <dd className="mt-1.5 truncate font-mono text-[12px] text-ink-2">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-16">
            <SiteFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
