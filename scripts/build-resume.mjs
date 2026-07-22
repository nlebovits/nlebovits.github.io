// Generate src/resume.pdf from resume/resume.md, styled to match the site.
//
// The Markdown is the single source of truth. This renders it to an HTML
// page that reuses the site's typeface (Montserrat) and green palette, then
// prints it to PDF with system Chrome. It is kept out of the CI `build` on
// purpose so the GitHub Pages runner needs no browser. Run `pnpm resume`
// locally and commit the regenerated src/resume.pdf.
//
// Usage: pnpm resume   (or: node scripts/build-resume.mjs)

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { marked } from "marked";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mdPath = join(root, "resume", "resume.md");
const outPath = join(root, "src", "resume.pdf");

// Single newlines inside a block become <br>, so each entry's title and its
// detail line stay on separate lines.
marked.setOptions({ breaks: true });

let body = marked.parse(readFileSync(mdPath, "utf8"));

// Mute the "· dates · place" segment that follows a bold entry title,
// matching the site's faint metadata colour. It runs from </strong> to the
// line break (when a detail line follows) or the end of the paragraph.
body = body.replace(
  /<\/strong>([^<]*)(<br\s*\/?>|<\/p>)/g,
  '</strong><span class="meta">$1</span>$2',
);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    @page { margin: 0.55in 0.6in; }
    * { box-sizing: border-box; }
    html { font-size: 10.25pt; }
    body {
      font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #2b2b2b;
      line-height: 1.45;
      margin: 0;
    }
    /* Name */
    h1 {
      font-size: 23pt;
      font-weight: 700;
      color: #2e3c2f;
      margin: 0 0 3pt;
      letter-spacing: -0.015em;
    }
    /* Contact line under the name */
    h1 + p {
      color: #6d6d6d;
      font-size: 9pt;
      margin: 0 0 16pt;
    }
    h1 + p a { color: #425744; }
    /* Section headings */
    h2 {
      font-size: 9.5pt;
      font-weight: 700;
      color: #425744;
      text-transform: uppercase;
      letter-spacing: 0.13em;
      margin: 17pt 0 8pt;
      padding-bottom: 3pt;
      border-bottom: 0.75pt solid rgba(66, 87, 68, 0.3);
      break-after: avoid;
    }
    /* Organization */
    h3 {
      font-size: 11.5pt;
      font-weight: 700;
      color: #1f2820;
      margin: 11pt 0 1pt;
      break-after: avoid;
    }
    h2 + h3 { margin-top: 1pt; }
    /* Role, meta, and description */
    p {
      margin: 0 0 7pt;
      max-width: 64em;
      break-inside: avoid;
    }
    p strong { font-weight: 600; color: #2b2b2b; }
    .meta { color: #7a7a7a; font-weight: 400; }
    em { font-style: italic; }
    a { color: #425744; text-decoration: none; }
  </style>
</head>
<body>
${body}</body>
</html>
`;

const tmpHtml = join(tmpdir(), "nlebovits-resume.html");
writeFileSync(tmpHtml, html, "utf8");

const candidates = [
  process.env.CHROME_BIN,
  "google-chrome",
  "google-chrome-stable",
  "chromium",
  "chromium-browser",
].filter(Boolean);

function resolveChrome() {
  for (const bin of candidates) {
    try {
      execFileSync(bin, ["--version"], { stdio: "ignore" });
      return bin;
    } catch {
      /* try next */
    }
  }
  throw new Error(
    `No Chrome/Chromium found. Tried: ${candidates.join(", ")}. ` +
      `Set CHROME_BIN to a browser binary.`,
  );
}

const chrome = resolveChrome();
execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=5000",
    `--print-to-pdf=${outPath}`,
    pathToFileURL(tmpHtml).href,
  ],
  { stdio: "ignore" },
);

if (!existsSync(outPath)) throw new Error("resume.pdf was not produced");
console.log(`Wrote ${outPath} (via ${chrome})`);
