import { useEffect, useRef, useState, type ReactNode } from "react";

type SpecimenProps = {
  children: ReactNode;
  /** Sizing stays with the caller; this only controls the black stage. */
  className?: string;
  /** `thumb` additionally cancels the loaders' full-screen optical nudge. */
  variant?: "panel" | "thumb";
  /**
   * Each loader measures every path on mount, which forces layout. Deferring
   * until the tile is nearly in view keeps a 37-tile grid cheap.
   */
  lazy?: boolean;
};

export function Specimen({
  children,
  className = "",
  variant = "panel",
  lazy = false,
}: SpecimenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(!lazy);

  useEffect(() => {
    if (!lazy || shown) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShown(true);
      },
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [lazy, shown]);

  return (
    <div
      ref={ref}
      className={`specimen overflow-hidden bg-stage ${
        variant === "thumb" ? "specimen-thumb" : ""
      } ${className}`}
    >
      {shown ? children : null}
    </div>
  );
}
