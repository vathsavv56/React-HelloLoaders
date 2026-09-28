import type { Loader } from "../lib/loaders";
import { loaders, loaderCount } from "../lib/loaders";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Specimen } from "../components/Specimen";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

/** A spread of scripts so the strip reads as a range rather than a sample. */
const FEATURED = ["english", "hindi", "korean", "arabic", "thai", "japanese"];

const facts: Array<{ value: string; label: string }> = [
  { value: String(loaderCount), label: "loaders" },
  { value: "1", label: "file each" },
  { value: "0", label: "dependencies" },
  { value: "4.8s", label: "to draw" },
];

function SpecimenStrip({ items }: { items: Loader[] }) {
  return (
    <section className="border-t border-line pt-10">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-[13px] font-medium text-ink-2">A few of them</h2>
        <Link
          to="/menu"
          className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink"
        >
          All {loaderCount}
          <ArrowRight size={13} />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-3 lg:grid-cols-6">
        {items.map((loader) => (
          <Link
            key={loader.slug}
            to={`/${loader.slug}`}
            className="group bg-panel transition-colors hover:bg-paper"
          >
            <Specimen className="aspect-4/3" variant="thumb" lazy>
              <loader.Component />
            </Specimen>
            <div className="flex items-center justify-between px-3 py-2.5">
              <span className="truncate text-[12px] text-ink-2 group-hover:text-ink">
                {loader.name}
              </span>
              <ArrowRight
                size={12}
                className="shrink-0 text-ink-4 transition-colors group-hover:text-ink-2"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Landing() {
  const featured = FEATURED.map((slug) =>
    loaders.find((loader) => loader.slug === slug),
  ).filter((loader): loader is Loader => loader !== undefined);

  const hero = loaders.find((loader) => loader.slug === "arabic");

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 sm:px-8">
        <SiteHeader />

        <main className="flex flex-1 flex-col">
          <div className="grid flex-1 items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:py-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-4">
                React · Tailwind · SVG
              </p>

              <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[3.6rem]">
                Loading states,
                <br />
                hand-lettered.
              </h1>

              <p className="mt-6 max-w-[46ch] text-[15px] leading-[1.7] text-ink-2">
                Every loader traces the word <em>hello</em> in a different
                language and script, as a single inline SVG. Pick one, copy the
                file, and drop it into any React project — no runtime, no
                dependencies, no build step.
              </p>

              <dl className="mt-10 grid max-w-md grid-cols-4 gap-px border border-line bg-line">
                {facts.map((fact) => (
                  <div key={fact.label} className="bg-panel px-3 py-3">
                    <dt className="font-mono text-[15px] text-ink">
                      {fact.value}
                    </dt>
                    <dd className="mt-0.5 text-[11px] leading-tight text-ink-4">
                      {fact.label}
                    </dd>
                  </div>
                ))}
              </dl>

              <Link
                to="/menu"
                className="group mt-10 inline-flex items-center gap-2 border-b border-ink pb-1 text-[14px] font-medium text-ink"
              >
                Browse the directory
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </div>

            <Specimen className="aspect-4/3 w-full border border-line">
              {hero && <hero.Component />}
            </Specimen>
          </div>

          <SpecimenStrip items={featured} />

          <div className="mt-16 md:mt-20">
            <SiteFooter />
          </div>
        </main>
      </div>
    </div>
  );
}
