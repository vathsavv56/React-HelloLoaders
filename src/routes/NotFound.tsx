import { Link } from "react-router";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 sm:px-8">
        <SiteHeader />

        <main className="flex flex-1 flex-col items-start justify-center py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-4">
            404
          </p>
          <h1 className="mt-4 text-[2.4rem] font-semibold tracking-[-0.02em] text-ink">
            No such loader.
          </h1>
          <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-ink-2">
            That path doesn&apos;t match any of the loaders in the collection.
          </p>
          <Link
            to="/menu"
            className="mt-8 border-b border-ink pb-1 text-[14px] font-medium text-ink"
          >
            Browse the directory
          </Link>
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
