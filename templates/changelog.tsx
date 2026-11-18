import { lint } from "@hyper-elements/lint";
import { prop } from "@hyper-elements/react";
import { template } from "@hyper-elements/react/template";
import TrellisChangelog, { example } from "../src/trellis-changelog";

const dated = {
  date: prop.date({ label: "Publication date", required: true, guidance: "The day this note went public, in YYYY-MM-DD form." }),
  version: prop.text({ label: "Version", required: true, maxLength: 14, pattern: "^\\d+\\.\\d+(\\.\\d+)?$", guidance: "Use two or three numbers, such as 2.6 or 2.6.1. The page adds the v." }),
};
const title = prop.text({ label: "Headline", required: true, maxLength: 72 });
const summary = prop.text({ label: "Details", required: true, maxLength: 280 });
const changes = prop.list(prop.object({
  kind: prop.choice(["New", "Improved", "Fixed"], { label: "Change kind", required: true }),
  text: prop.text({ label: "Change", required: true, maxLength: 150, guidance: "Write a sentence about what the reader can do or what now works." }),
}, { label: "One change" }), { label: "Changes", required: true, min: 1, max: 8 });

export default template({
  id: "trellis.Changelog", version: "1.0.0", root: "Page", label: "Trellis changelog",
  guidance: "Use a feature for a new workflow, a small release for a handful of changes, and a notice for a deadline readers need to act on.",
  fields: {
    product: prop.text({ label: "Product name", required: true, maxLength: 24 }),
    intro: prop.text({ label: "Introduction", required: true, maxLength: 150, guidance: "Introduce the product and what its release notes cover in one sentence." }),
    email: prop.link({ label: "Email signup page", required: true }),
    rss: prop.link({ label: "RSS feed", required: true }),
    social: prop.link({ label: "Community profile", required: true }),
    handle: prop.text({ label: "Profile handle", required: true, maxLength: 24, pattern: "^@[A-Za-z0-9_]+$" }),
    releases: prop.blocks({
      feature: prop.object({ ...dated, title, summary, illustration: prop.choice(["weekly", "board"], {
        label: "Feature drawing", required: true, guidance: "Weekly shows the next three weekly task dates after publication. Board shows a project kickoff board being copied.",
      }), changes }, { label: "Feature release" }),
      small: prop.object({ ...dated, changes }, { label: "Small release" }),
      notice: prop.object({ ...dated, title, summary }, { label: "Service notice", guidance: "Say what changes, when, and what readers should do." }),
    }, { label: "Release history", required: true, min: 1, max: 24, guidance: "Add one object per release. The page puts the newest date first." }),
  },
  rules: {
    plugins: { lint: lint() },
    require: { lint: ["title", "heading-order", "heading-one", "contrast", "image-alt", "alt-text", "link-text"], core: ["layout/overflow"] },
    root: { lang: true }, links: { domains: ["trellis.example"], schemes: [], tags: "deny" },
  },
  example,
  render(values) { return <TrellisChangelog {...values} />; },
});
