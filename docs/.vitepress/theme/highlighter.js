/* ============================================================
   Kordex — Syntax highlighter
   Pure JS, no dependencies, matches CodeBlock.vue palette.
   Languages: JavaScript, TypeScript, Shell, JSON, plain text.
   ============================================================ */

/* ── JS/TS keyword sets ── */
const KW = new Set([
  "abstract",
  "as",
  "async",
  "await",
  "break",
  "case",
  "catch",
  "class",
  "const",
  "continue",
  "debugger",
  "declare",
  "default",
  "delete",
  "do",
  "else",
  "enum",
  "export",
  "extends",
  "finally",
  "for",
  "from",
  "function",
  "get",
  "if",
  "implements",
  "import",
  "in",
  "infer",
  "instanceof",
  "interface",
  "is",
  "keyof",
  "let",
  "namespace",
  "new",
  "of",
  "override",
  "package",
  "private",
  "protected",
  "public",
  "readonly",
  "return",
  "satisfies",
  "set",
  "static",
  "super",
  "switch",
  "this",
  "throw",
  "try",
  "type",
  "typeof",
  "var",
  "void",
  "while",
  "with",
  "yield",
]);

const CTRL_FLOW = new Set([
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "default",
  "break",
  "continue",
  "return",
  "throw",
  "try",
  "catch",
  "finally",
  "await",
  "yield",
]);

/* TS primitive + utility types and common runtime types */
const TYPES = new Set([
  "any",
  "unknown",
  "never",
  "void",
  "boolean",
  "number",
  "bigint",
  "string",
  "symbol",
  "object",
  "undefined",
  "null",
  "Array",
  "ReadonlyArray",
  "Record",
  "Partial",
  "Required",
  "Readonly",
  "Pick",
  "Omit",
  "Exclude",
  "Extract",
  "NonNullable",
  "Parameters",
  "ReturnType",
  "Awaited",
  "Promise",
  "Map",
  "Set",
  "WeakMap",
  "WeakSet",
  "Date",
  "RegExp",
  "Error",
  "TypeError",
  "RangeError",
  "Function",
  "Object",
  "Boolean",
  "Number",
  "String",
  "Symbol",
  "BigInt",
  "Uint8Array",
  "Int8Array",
  "Uint16Array",
  "Int16Array",
  "Uint32Array",
  "Int32Array",
  "Float32Array",
  "Float64Array",
  "ArrayBuffer",
  "Iterable",
  "Iterator",
  "AsyncIterable",
]);

/* literals / constants that get their own color */
const LITERALS = new Set([
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity",
  "globalThis",
]);

/* global objects / built-in namespaces */
const GLOBALS = new Set([
  "console",
  "Math",
  "JSON",
  "Object",
  "Array",
  "Promise",
  "Reflect",
  "Proxy",
  "Symbol",
  "globalThis",
  "process",
  "kordex",
  "softadastra",
]);

/* built-in methods / common runtime functions */
const BUILTINS = new Set([
  "log",
  "info",
  "warn",
  "error",
  "debug",
  "trace",
  "assert",
  "parse",
  "stringify",
  "keys",
  "values",
  "entries",
  "assign",
  "freeze",
  "create",
  "map",
  "filter",
  "reduce",
  "forEach",
  "find",
  "findIndex",
  "some",
  "every",
  "includes",
  "indexOf",
  "push",
  "pop",
  "shift",
  "unshift",
  "slice",
  "splice",
  "concat",
  "join",
  "split",
  "trim",
  "replace",
  "replaceAll",
  "toUpperCase",
  "toLowerCase",
  "startsWith",
  "endsWith",
  "padStart",
  "padEnd",
  "repeat",
  "charAt",
  "charCodeAt",
  "substring",
  "substr",
  "then",
  "catch",
  "finally",
  "resolve",
  "reject",
  "all",
  "race",
  "allSettled",
  "setTimeout",
  "setInterval",
  "clearTimeout",
  "clearInterval",
  "require",
  "isArray",
  "from",
  "of",
  "has",
  "set",
  "get",
  "delete",
  "add",
  "clear",
]);

/* ── Helpers ── */
function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function wrap(cls, text) {
  return `<span class="${cls}">${esc(text)}</span>`;
}

function normalizeShellText(raw) {
  return String(raw ?? "")
    .split("\n")
    .map((line) =>
      line.replace(/^\s*>\s?/, "").replace(/\s*>\s*:(\d{2,5})/g, " :$1"),
    )
    .join("\n");
}

/* ── Comment splitter (line comments only at top level) ── */
function splitComment(line) {
  let inStr = false;
  let strCh = "";
  for (let i = 0; i < line.length - 1; i++) {
    const c = line[i];
    if (inStr) {
      if (c === strCh && line[i - 1] !== "\\") inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inStr = true;
      strCh = c;
      continue;
    }
    if (line[i] === "/" && line[i + 1] === "/") {
      const before = line.slice(0, i);
      if (before.endsWith("http:") || before.endsWith("https:")) continue;
      return { code: before, comment: line.slice(i) };
    }
  }
  return { code: line, comment: "" };
}

/* ── Inline tokens (JS/TS) ── */
function hlInline(s) {
  let out = "";
  let i = 0;
  const isStart = (c) => /[A-Za-z_$]/.test(c);
  const isId = (c) => /[A-Za-z0-9_$]/.test(c);

  while (i < s.length) {
    const ch = s[i];

    /* Template strings */
    if (ch === "`") {
      let j = i + 1;
      while (j < s.length) {
        if (s[j] === "`" && s[j - 1] !== "\\") break;
        j++;
      }
      const str = s.slice(i, Math.min(j + 1, s.length));
      out += wrap("cb-tmpl", str);
      i += str.length;
      continue;
    }

    /* Double / single quoted strings */
    if (ch === '"' || ch === "'") {
      let j = i + 1;
      while (j < s.length) {
        if (s[j] === ch && s[j - 1] !== "\\") break;
        j++;
      }
      const str = s.slice(i, Math.min(j + 1, s.length));
      out += wrap("cb-str", str);
      i += str.length;
      continue;
    }

    /* Numbers */
    if (/[0-9]/.test(ch)) {
      const m = s
        .slice(i)
        .match(
          /^(0[xX][0-9A-Fa-f_]+|0[bB][01_]+|0[oO][0-7_]+|[0-9][0-9_]*(?:\.[0-9_]+)?(?:[eE][+-]?[0-9_]+)?)(n)?/,
        );
      if (m) {
        out += wrap("cb-num", m[0]);
        i += m[0].length;
        continue;
      }
    }

    /* Identifiers & keywords */
    if (isStart(ch)) {
      let j = i + 1;
      while (j < s.length && isId(s[j])) j++;
      const id = s.slice(i, j);

      const nextNonSp = (() => {
        for (let k = j; k < s.length; k++)
          if (s[k] !== " " && s[k] !== "\t") return s[k];
        return "";
      })();
      const prevNonSp = (() => {
        for (let k = i - 1; k >= 0; k--)
          if (s[k] !== " " && s[k] !== "\t") return s[k];
        return "";
      })();

      const isMember = prevNonSp === ".";

      if (isMember) {
        // After a dot: it's a member access or a method call,
        // never a keyword/type/namespace (get/set/of/etc. are valid members).
        if (nextNonSp === "(")
          out += BUILTINS.has(id) ? wrap("cb-blt", id) : wrap("cb-fn", id);
        else out += wrap("cb-mem", id);
      } else if (LITERALS.has(id)) out += wrap("cb-const", id);
      else if (CTRL_FLOW.has(id)) out += wrap("cb-ctrl", id);
      else if (KW.has(id)) out += wrap("cb-kw", id);
      else if (GLOBALS.has(id) && prevNonSp !== ":") out += wrap("cb-ns", id);
      else if (TYPES.has(id)) out += wrap("cb-type", id);
      else if (nextNonSp === "(")
        out += BUILTINS.has(id) ? wrap("cb-blt", id) : wrap("cb-fn", id);
      else if (/^[A-Z][A-Za-z0-9_$]*$/.test(id) && nextNonSp !== "(")
        out += wrap("cb-type", id);
      else if (/^[A-Z][A-Z0-9_]+$/.test(id)) out += wrap("cb-const", id);
      else out += wrap("cb-id", id);

      i = j;
      continue;
    }

    /* Multi-char operators */
    const two = s.slice(i, i + 2);
    const three = s.slice(i, i + 3);
    if (
      three === "===" ||
      three === "!==" ||
      three === "..." ||
      three === "**="
    ) {
      out += wrap("cb-op", three);
      i += 3;
      continue;
    }
    if (
      [
        "=>",
        "==",
        "!=",
        "<=",
        ">=",
        "&&",
        "||",
        "??",
        "?.",
        "++",
        "--",
        "+=",
        "-=",
        "*=",
        "/=",
        "%=",
        "**",
        "<<",
        ">>",
        "|=",
        "&=",
        "^=",
      ].includes(two)
    ) {
      const cls = two === "=>" ? "cb-arrow" : "cb-op";
      out += wrap(cls, two);
      i += 2;
      continue;
    }

    /* Single-char punctuation */
    if (/[\(\)\{\}\[\];\,\.\:\=\+\-\*\/\<\>\!\&\|\?\~\%\^]/.test(ch)) {
      if (ch === "{" || ch === "}") out += wrap("cb-brace", ch);
      else if (ch === "(" || ch === ")") out += wrap("cb-paren", ch);
      else if (ch === "[" || ch === "]") out += wrap("cb-bracket", ch);
      else if (ch === ";") out += wrap("cb-semi", ch);
      else out += wrap("cb-op", ch);
      i++;
      continue;
    }

    out += esc(ch);
    i++;
  }

  return out.replace(/(https?:\/\/[^\s<]+)/g, `<span class="cb-url">$1</span>`);
}

/* ── Public: JavaScript / TypeScript highlighter ── */
export function highlightJs(raw) {
  return String(raw ?? "")
    .split("\n")
    .map((line) => {
      const { code, comment } = splitComment(line);
      return hlInline(code) + (comment ? wrap("cb-cmt", comment) : "");
    })
    .join("\n");
}

/* ── Public: JSON highlighter ── */
export function highlightJson(raw) {
  return String(raw ?? "")
    .split("\n")
    .map((line) => {
      let out = "";
      let i = 0;
      while (i < line.length) {
        const ch = line[i];

        /* strings (keys or values) */
        if (ch === '"') {
          let j = i + 1;
          while (j < line.length) {
            if (line[j] === '"' && line[j - 1] !== "\\") break;
            j++;
          }
          const str = line.slice(i, Math.min(j + 1, line.length));
          /* lookahead: a colon after the string ⇒ it's a key */
          let k = j + 1;
          while (k < line.length && (line[k] === " " || line[k] === "\t")) k++;
          out += wrap(line[k] === ":" ? "cb-key" : "cb-str", str);
          i += str.length;
          continue;
        }

        /* numbers */
        if (/[-0-9]/.test(ch)) {
          const m = line
            .slice(i)
            .match(/^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/);
          if (m && m[0]) {
            out += wrap("cb-num", m[0]);
            i += m[0].length;
            continue;
          }
        }

        /* literals */
        const lit = line.slice(i).match(/^(true|false|null)\b/);
        if (lit) {
          out += wrap("cb-const", lit[0]);
          i += lit[0].length;
          continue;
        }

        if (ch === "{" || ch === "}") out += wrap("cb-brace", ch);
        else if (ch === "[" || ch === "]") out += wrap("cb-bracket", ch);
        else if (ch === ":") out += wrap("cb-op", ch);
        else if (ch === ",") out += wrap("cb-semi", ch);
        else out += esc(ch);
        i++;
      }
      return out;
    })
    .join("\n");
}

/* ── Public: Shell highlighter ── */
export function highlightShell(raw) {
  let s = esc(normalizeShellText(raw));

  // Prompt: $, ~$, /path$
  s = s.replace(
    /^(\s*(?:~|\/[^$]*)?\s*\$)/gm,
    `<span class="cb-sh-prompt">$1</span>`,
  );

  // First command on each line
  s = s.replace(
    /(^\s*(?:<span[^>]*>.*?<\/span>\s*)?)([a-zA-Z0-9_.\/@-]+)(\s+)/gm,
    `$1<span class="cb-sh-cmd">$2</span>$3`,
  );

  // Flags: --foo, -x, --key=value
  s = s.replace(
    /(\s--?[a-zA-Z0-9_-]+(?:=[^\s]+)?)/g,
    `<span class="cb-sh-flag">$1</span>`,
  );

  // URLs
  s = s.replace(/(https?:\/\/[^\s]+)/g, `<span class="cb-sh-url">$1</span>`);

  // Paths
  s = s.replace(
    /(\s(?:\.{0,2}\/[^\s]+))/g,
    `<span class="cb-sh-path">$1</span>`,
  );

  // Ports like :8080
  s = s.replace(/(:\d{2,5}\b)/g, `<span class="cb-sh-port">$1</span>`);

  // HTTP response lines
  s = s.replace(
    /^(HTTP\/\d\.\d\s+\d+\s+.*)$/gm,
    `<span class="cb-sh-http">$1</span>`,
  );

  // Shell comments
  s = s.replace(/#([^\n]*)/g, `<span class="cb-sh-comment">#$1</span>`);

  return s;
}

/* ── Public: plain text passthrough ── */
export function highlightText(raw) {
  return esc(raw ?? "");
}

/* ── Public: language alias normalizer ── */
export function normalizeLang(lang) {
  const l = String(lang || "")
    .toLowerCase()
    .trim();

  if (
    [
      "sh",
      "bash",
      "zsh",
      "shell",
      "console",
      "terminal",
      "powershell",
      "ps1",
    ].includes(l)
  ) {
    return "shell";
  }
  if (["js", "javascript", "mjs", "cjs", "jsx"].includes(l)) {
    return "js";
  }
  if (["ts", "typescript", "tsx", "mts", "cts"].includes(l)) {
    return "ts";
  }
  if (["json", "jsonc", "json5"].includes(l)) {
    return "json";
  }
  if (["txt", "text", "plain", "plaintext"].includes(l)) {
    return "text";
  }

  return l || "text";
}
