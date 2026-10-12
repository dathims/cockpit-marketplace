// Checks the static site before publishing: valid internal links and typography.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("public");
const pages = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else pages.push(full);
  }
};
walk(root);

const errors = [];
for (const file of pages.filter((f) => /\.(html|css)$/.test(f))) {
  const text = fs.readFileSync(file, "utf8");
  if (/[\u2013\u2014]/.test(text)) errors.push(`${path.relative(root, file)}: long dash not allowed`);
  if (!file.endsWith(".html")) continue;
  for (const [, raw] of text.matchAll(/(?:href|src)="([^"]*)"/g)) {
    // External links (https:, mailto:) and anchors are skipped: only the site's own files are checked.
    const ref = raw.split(/[#?]/)[0];
    if (!ref || /^[a-z]+:/i.test(ref)) continue;
    let target = path.resolve(path.dirname(file), ref);
    if (ref.endsWith("/") || fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
    if (!fs.existsSync(target)) errors.push(`${path.relative(root, file)}: broken link ${ref}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK: ${pages.length} files checked.`);
