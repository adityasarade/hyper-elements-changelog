import { mkdir, readFile, writeFile } from "node:fs/promises";
import { changelogUrl, releaseEntries } from "../src/trellis-changelog";
import template from "../templates/changelog";

const input = process.argv[2] ?? "designs/changelog.values.json";
const { values } = JSON.parse(await readFile(input, "utf8"));
const checked = template.check(values);
if (!checked.valid || !checked.values) {
  throw new Error(checked.diagnostics.map((d) => `${d.path}: ${d.message}`).join("\n"));
}
const { product, site, intro, releases } = checked.values;
const page = changelogUrl(site);

function xml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

const items = releaseEntries(releases).map(({ release, id }) => {
  const title = release.type === "small" ? `${product} v${release.version}` : release.title;
  const description = [
    ...(release.type === "small" ? [] : [release.summary]),
    ...(release.type === "notice" ? [] : release.changes.map((change) => `${change.kind}: ${change.text}`)),
  ].join("\n");
  const link = xml(page + "#" + id);
  return `    <item>
      <title>${xml(title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(release.date + "T00:00:00Z").toUTCString()}</pubDate>
      <description>${xml(description)}</description>
    </item>`;
});

await mkdir("out", { recursive: true });
await writeFile(
  "out/rss.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xml(product)} changelog</title>
    <link>${xml(page)}</link>
    <description>${xml(intro)}</description>
${items.join("\n")}
  </channel>
</rss>
`,
);
console.log(`out/rss.xml: ${items.length} items, newest first`);
