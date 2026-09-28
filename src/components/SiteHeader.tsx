import { NavLink, Link } from "react-router";

const GITHUB = "https://github.com/vathsavv56";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-ink ${
    isActive ? "text-ink" : "text-ink-3"
  }`;

export function SiteHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-line">
      <Link to="/" className="group flex items-center gap-2.5">
        <span className="grid h-[22px] w-[22px] place-items-center bg-ink text-[13px] font-semibold leading-none text-paper">
          h
        </span>
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-ink">
          Hello Loaders
        </span>
      </Link>

      <nav className="flex items-center gap-6 text-[13px]">
        <NavLink to="/menu" className={navLinkClass}>
          Directory
        </NavLink>
        <a
          href={GITHUB}
          target="_blank"
          rel="noreferrer"
          className="text-ink-3 transition-colors hover:text-ink"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
