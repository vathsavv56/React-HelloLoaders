export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-2 border-t border-line py-6 text-[12px] text-ink-4 sm:flex-row sm:items-center sm:justify-between">
      <p>
        {new Date().getFullYear()} · Every loader is a single self-contained
        file.
      </p>
      <p className="text-ink-3">
        No runtime, no dependencies, no build step.
      </p>
    </footer>
  );
}
