import type { ReactNode } from "react";

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "default",
  "function",
  "return",
  "const",
  "let",
  "var",
  "if",
  "else",
  "for",
  "while",
  "switch",
  "case",
  "break",
  "continue",
  "new",
  "class",
  "extends",
  "type",
  "interface",
  "as",
  "async",
  "await",
]);

const LITERALS = new Set(["true", "false", "null", "undefined"]);

const TOKEN_PATTERN =
  /(\/\/.*$|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b[A-Za-z_][A-Za-z0-9_]*\b|<\/?[A-Za-z][A-Za-z0-9]*|[{}()[\].,;<>]|\b\d+(?:\.\d+)?\b)/g;

const COMMENT = "text-code-comment italic";
const STRING = "text-code-string";
const KEYWORD = "text-code-keyword";
const LITERAL = "text-code-number";
const TAG = "text-code-tag";
const NUMBER = "text-code-number";
const PUNCT = "text-code-punct";
const BASE = "text-code-base";

function classify(token: string): string {
  if (token.startsWith("//")) return COMMENT;
  if (/^["'`]/.test(token)) return STRING;
  if (KEYWORDS.has(token)) return KEYWORD;
  if (LITERALS.has(token)) return LITERAL;
  if (/^<\/?[A-Za-z]/.test(token)) return TAG;
  if (/^\d/.test(token)) return NUMBER;
  if (/^[{}()[\].,;<>]$/.test(token)) return PUNCT;
  return BASE;
}

/** Tokenize a single line of TSX into coloured spans. */
export function highlightLine(line: string, lineIndex: number): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let key = 0;

  for (const match of line.matchAll(TOKEN_PATTERN)) {
    const token = match[0];
    const start = match.index ?? 0;

    if (start > cursor) {
      nodes.push(
        <span key={`${lineIndex}-p${key++}`} className={BASE}>
          {line.slice(cursor, start)}
        </span>,
      );
    }

    nodes.push(
      <span key={`${lineIndex}-t${key++}`} className={classify(token)}>
        {token}
      </span>,
    );

    cursor = start + token.length;
  }

  if (cursor < line.length) {
    nodes.push(
      <span key={`${lineIndex}-p${key++}`} className={BASE}>
        {line.slice(cursor)}
      </span>,
    );
  }

  if (nodes.length === 0) {
    nodes.push(<span key={`${lineIndex}-e`}>{"\u00a0"}</span>);
  }

  return nodes;
}
