import { lint } from "@hyper-elements/lint";
import { prop } from "@hyper-elements/react";
import { field, template } from "@hyper-elements/react/template";
import TrellisChangelog, { example, hrefOf, type ChangelogProps } from "../src/trellis-changelog";

const number = "(?:0|[1-9][0-9]*)";
const prerelease = `(?:${number}|[0-9]*[A-Za-z-][0-9A-Za-z-]*)`;
const build = "[0-9A-Za-z-]+";
const versionOptions = {
  label: "Version",
  maxLength: 128,
  pattern: `^${number}\\.${number}(?:\\.${number}(?:-${prerelease}(?:\\.${prerelease})*)?(?:\\+${build}(?:\\.${build})*)?)?$`,
  guidance: "Use 2.6 or a full semantic version, such as 2.7.0-beta.1+build.5. The page adds the v.",
};
const dated = {
  id: prop.text({
    label: "Permalink ID",
    pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    maxLength: 160,
    guidance: "Optional unique slug, such as board-library. Defaults to the version, or notice-YYYY-MM-DD for an unversioned notice. Keep a published ID stable.",
  }),
  date: prop.date({
    label: "Publication date",
    required: true,
    guidance: "The day this note went public, in YYYY-MM-DD form.",
  }),
  version: prop.text({ ...versionOptions, required: true }),
};
const title = prop.text({ label: "Headline", required: true, maxLength: 72 });
const summary = prop.text({ label: "Details", required: true, maxLength: 280 });
const changes = prop.list(
  prop.object(
    {
      kind: prop.choice(["New", "Improved", "Fixed"], { label: "Change kind", required: true }),
      text: prop.text({
        label: "Change",
        required: true,
        maxLength: 150,
        guidance: "Write a sentence about what the reader can do or what now works.",
      }),
    },
    { label: "One change" },
  ),
  { label: "Changes", required: true, min: 1, max: 8 },
);

// In Elements 0.5, links.domains is frozen when a template is defined. Check the
// value-dependent hosts here, and let rules.links check schemes and tags in the rendered page.
function checkDomains(values: ChangelogProps) {
  function host(link: ChangelogProps["email"], fieldName: string) {
    const url = URL.canParse(hrefOf(link)) ? new URL(hrefOf(link)) : undefined;
    if (!url || !["https:", "http:"].includes(url.protocol) || url.username || url.password) {
      throw new Error(`${fieldName} needs an absolute HTTP(S) URL without credentials.`);
    }
    return url.hostname;
  }
  const allowed = new Set([host(values.site, "site"), host(values.social, "social"), host(values.rss, "rss")]);
  if (values.newsletterHost) allowed.add(values.newsletterHost.toLowerCase());
  function check(link: ChangelogProps["email"], fieldName: string) {
    if (!allowed.has(host(link, fieldName))) {
      throw new Error(
        `${fieldName} must link to a declared site, community, feed or newsletter host (${[...allowed].join(", ")}).`,
      );
    }
  }
  check(values.email, "email");
  if (values.archive) check(values.archive, "archive");
  values.nav.forEach((item, i) => check(item.href, `nav[${i}].href`));
}

export default template({
  id: "trellis.Changelog",
  version: "2.1.0",
  root: "Page",
  label: "Trellis changelog",
  guidance:
    "Use a feature for a new workflow, a small release for a handful of changes, and a notice for a deadline readers need to act on.",
  migrate: {
    1: (values) => ({ site: example.site, nav: example.nav, ...values }),
  },
  fields: {
    site: prop.text({
      label: "Product site URL",
      required: true,
      maxLength: 2048,
      pattern: "^https?://[^?#\\s]+$",
      guidance:
        "The product home. Serve the changelog at changelog under this URL.",
    }),
    wordmark: prop.text({
      label: "Wordmark text",
      maxLength: 28,
      guidance: "Leave empty to use the product name.",
    }),
    nav: prop.list(
      prop.object(
        {
          text: prop.text({ label: "Link text", required: true, maxLength: 24 }),
          href: prop.link({ label: "Destination", required: true }),
        },
        { label: "Navigation item" },
      ),
      { label: "Header navigation", required: true, min: 1, max: 5 },
    ),
    product: prop.text({ label: "Product name", required: true, maxLength: 24 }),
    intro: prop.text({
      label: "Introduction",
      required: true,
      maxLength: 150,
      guidance: "Introduce the product and what its release notes cover in one sentence.",
    }),
    email: prop.link({ label: "Email signup page", required: true }),
    newsletterHost: prop.text({
      label: "Newsletter host",
      maxLength: 253,
      pattern: "^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\\.)*[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$",
      guidance: "If signup uses a separate host, declare its hostname here, such as letters.trellis.example.",
    }),
    archive: prop.link({ label: "Earlier releases URL", guidance: "Supply the URL of an existing archive to show the footer button." }),
    rss: prop.link({ label: "RSS feed", required: true }),
    social: prop.link({ label: "Community profile", required: true }),
    handle: prop.text({ label: "Profile handle", required: true, maxLength: 24, pattern: "^@[A-Za-z0-9_]+$" }),
    releases: prop.blocks(
      {
        feature: prop.object(
          {
            ...dated,
            title,
            summary,
            illustration: prop.choice(["weekly", "board"], {
              label: "Feature drawing",
              guidance:
                "Weekly shows the next three weekly task dates after publication. Board shows a project kickoff board being copied.",
            }),
            screenshot: field.image({
              label: "Product screenshot",
              fit: "contain",
              accepts: ["png", "jpeg", "webp"],
              aspect: { min: 1, max: 2.5 },
              minWidth: 800,
              guidance: "Optional. Give the file URL, width and height. A screenshot takes the place of a drawing.",
            }),
            screenshotAlt: prop.text({
              label: "Screenshot description",
              maxLength: 160,
              guidance: "Describe the product change visible in the image. Defaults to the headline.",
            }),
            changes,
          },
          { label: "Feature release" },
        ),
        small: prop.object({ ...dated, changes }, { label: "Small release" }),
        notice: prop.object(
          { ...dated, version: prop.text(versionOptions), title, summary },
          { label: "Service notice", guidance: "Say what changes, when, and what readers should do." },
        ),
      },
      {
        label: "Release history",
        required: true,
        min: 1,
        max: 24,
        guidance: "Add one object per release. The page puts the newest date first.",
      },
    ),
  },
  rules: {
    plugins: { lint: lint() },
    require: {
      lint: ["title", "heading-order", "heading-one", "contrast", "image-alt", "alt-text", "link-text"],
      core: ["layout/overflow"],
    },
    root: { lang: true },
    links: { schemes: [], tags: "deny" },
  },
  example,
  render(values) {
    checkDomains(values);
    return TrellisChangelog(values);
  },
});
