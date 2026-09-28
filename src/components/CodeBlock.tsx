import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlightLine } from "../lib/highlight";

type CodeBlockProps = {
  code: string;
  filename: string;
};

export function CodeBlock({ code, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-stage">
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="truncate font-mono text-[11px] text-white/40">
          {filename}
        </span>

        <button
          type="button"
          onClick={copy}
          className="ml-3 inline-flex shrink-0 items-center gap-1.5 border border-white/15 px-2.5 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className="scroll-quiet min-h-0 flex-1 overflow-auto">
        <pre className="w-max min-w-full px-4 py-3 font-mono text-[12.5px] leading-[1.65]">
          <code>
            {code.split("\n").map((line, i) => (
              <span key={i} className="block">
                {highlightLine(line, i)}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
