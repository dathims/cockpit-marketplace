// Vérifie le site statique avant publication : liens internes valides et typographie.
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
  if (/[\u2013\u2014]/.test(text)) errors.push(`${path.relative(root, file)} : tiret long interdit`);
  if (!file.endsWith(".html")) continue;
  for (const [, raw] of text.matchAll(/(?:href|src)="([^"]*)"/g)) {
    // Liens externes (https:, mailto:) et ancres ignorés : seuls les fichiers du site sont vérifiés.
    const ref = raw.split(/[#?]/)[0];
    if (!ref || /^[a-z]+:/i.test(ref)) continue;
    let target = path.resolve(path.dirname(file), ref);
    if (ref.endsWith("/") || fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, "index.html");
    if (!fs.existsSync(target)) errors.push(`${path.relative(root, file)} : lien cassé ${ref}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`OK : ${pages.length} fichiers vérifiés.`);
