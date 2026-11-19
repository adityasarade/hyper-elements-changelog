/**
 * Trellis, a fictional planning tool for small teams, keeps a public record of what shipped.
 *
 * The page borrows from seed catalogues and garden post: Fraunces on cream paper, a flower
 * cut into a postage stamp, and dated entries set down a green rule. The big releases get
 * a drawing of their own. Small fixes take just a line.
 */
import {
  Button, Circle, Column, defineTheme, Divider, Heading, Image, Line, Link, Menu,
  Page, Path, Rect, Row, Section, Svg, Text, type LinkProps, type PageProps,
} from "@hyper-elements/react";

export const meta = {
  title: "Trellis changelog",
  description:
    "A product’s changelog: releases down a dated rail, each change marked new, improved or fixed, and the big ones drawn.",
  root: "Page",
};

const PAPER = "#FAF8F0";
const INK = "#203F31";
const QUIET = "#4F6357";
const RULE = "#C7CEC0";
const LEAF = "#386444";
const MINT = "#D9E5BC";
const LIGHT = "#F2F4D7";
const ORANGE = "#EE8A51";
const RUST = "#884022";
const OCHRE = "#F4E7C9";
const SERIF = "Fraunces, Georgia, serif";
const SANS = "'Instrument Sans', Arial, sans-serif";
const MONO = "'DM Mono', Menlo, monospace";
const fonts: PageProps["fonts"] = [
  {
    family: "Fraunces",
    src: "https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2",
    format: "woff2",
    weight: "100 900",
  },
  {
    family: "Instrument Sans",
    src: "https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2",
    format: "woff2",
    weight: "400 700",
  },
  {
    family: "DM Mono",
    src: "https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthqQBK6PYK0.woff2",
    format: "woff2",
    weight: 400,
  },
];
const label = { fontFamily: MONO, fontSize: 14, letterSpacing: 0.6, lineHeight: 1.25 } as const;
const hairline = `1px solid ${RULE}`;
const theme = defineTheme({
  colors: { background: PAPER, foreground: INK, primary: INK, primaryForeground: PAPER, border: RULE },
  fonts: { body: SANS, heading: SERIF },
  fontSizes: { body: 17 },
  lineHeights: { body: 1.5 },
  elements: {
    Heading: {
      fontWeight: 500,
      by: {
        level: {
          1: { fontSize: 96, lineHeight: 1.05, letterSpacing: -5, mobile: { fontSize: 46, letterSpacing: -2.4 } },
          2: { fontSize: 38, lineHeight: 1.12, letterSpacing: -1.3, mobile: { fontSize: 30, letterSpacing: -1 } },
        },
      },
    },
    Link: { color: INK, textDecoration: "none" },
    Button: { hover: { color: PAPER, backgroundColor: LEAF } },
  },
  styles: {
    pill: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: 1.25,
      padding: [3, 10],
      borderRadius: 20,
      textAlign: "center",
    },
    New: { backgroundColor: "#DAE8CD", color: "#264C32" },
    Improved: { backgroundColor: "#DBE7E8", color: "#28505A" },
    Fixed: { backgroundColor: "#F1DFD2", color: "#753E23" },
  },
});

type Change = { kind: "New" | "Improved" | "Fixed"; text: string };
type Screenshot = { src: string; width: number; height: number };
export type Release = { date: string; id?: string } & (
  | {
      type: "feature";
      version: string;
      title: string;
      summary: string;
      illustration?: "weekly" | "board";
      screenshot?: Screenshot;
      screenshotAlt?: string;
      changes: Change[];
    }
  | { type: "small"; version: string; changes: Change[] }
  | { type: "notice"; version?: string; title: string; summary: string }
);
type Href = LinkProps["href"];
export type ChangelogProps = {
  product: string;
  wordmark?: string;
  site: string;
  nav: { text: string; href: Href }[];
  intro: string;
  email: Href;
  newsletterHost?: string;
  archive?: Href;
  rss: Href;
  social: Href;
  handle: string;
  releases: Release[];
};
export const example: ChangelogProps = {
  product: "Trellis",
  wordmark: "Trellis",
  site: "https://trellis.example",
  nav: [
    {
      text: "Product",
      href: "https://trellis.example/product",
    },
    {
      text: "Pricing",
      href: "https://trellis.example/pricing",
    },
    {
      text: "Changelog",
      href: "https://trellis.example/changelog",
    },
    {
      text: "Sign in",
      href: "https://trellis.example/login",
    },
  ],
  intro: "Field notes on what’s new in Trellis, from the board to the smallest task.",
  email: "https://trellis.example/notes/subscribe",
  rss: "https://trellis.example/changelog/rss.xml",
  social: "https://trellis.example/community",
  handle: "@trellis",
  releases: [
    {
      type: "feature",
      date: "2026-11-13",
      version: "2.6",
      title: "Tasks on repeat",
      summary:
        "Give a task a day of the week. When you finish it, the next one appears on your board with its checklist and owner in place.",
      illustration: "weekly",
      changes: [
        {
          kind: "New",
          text: "Set a weekly repeat from any task’s due date.",
        },
        {
          kind: "Improved",
          text: "Preview the next three dates before you save.",
        },
      ],
    },
    {
      type: "small",
      date: "2026-10-30",
      version: "2.5.1",
      changes: [
        {
          kind: "Fixed",
          text: "Dragging a card keeps its checklist in order.",
        },
        {
          kind: "Improved",
          text: "Board search now finds cards by their old titles.",
        },
      ],
    },
    {
      type: "notice",
      date: "2026-10-23",
      version: "2.5",
      title: "Calendar feeds are moving",
      summary:
        "Old feed links retire on 1 December. Open Calendar sync on your board and copy the new link into your calendar.",
    },
    {
      type: "feature",
      date: "2026-10-09",
      version: "2.4",
      title: "Reusable project boards",
      summary:
        "Keep a clean copy of the board you reach for every project. A new board starts with its columns and checklists, ready for the next job.",
      illustration: "board",
      changes: [
        {
          kind: "New",
          text: "Save any board as a team template from the board menu.",
        },
        {
          kind: "Fixed",
          text: "Archived cards stay behind when you make a copy.",
        },
      ],
    },
    {
      type: "small",
      date: "2026-09-25",
      version: "2.3.2",
      changes: [
        {
          kind: "Improved",
          text: "Weekends are easier to spot on the timeline.",
        },
        {
          kind: "Fixed",
          text: "Milestones keep their dates when a teammate changes time zones.",
        },
      ],
    },
    {
      type: "small",
      date: "2026-09-11",
      version: "2.3.1",
      changes: [
        {
          kind: "Fixed",
          text: "Long board names wrap in the project switcher.",
        },
      ],
    },
  ],
};

export function hrefOf(link: Href) {
  return typeof link === "string" ? link : link.href;
}

export function changelogUrl(site: string) {
  return new URL("changelog", site.replace(/\/?$/, "/")).href;
}

// Keep the original index for image field bindings, even when input is out of date order.
export function releaseEntries(releases: Release[]) {
  const used = new Set<string>();
  return releases
    .map((release, index) => {
      const id = release.id ?? (release.version
        ? "v" + release.version.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")
        : "notice-" + release.date);
      if (used.has(id)) {
        throw new Error(`Duplicate release id "${id}" at releases[${index}]. Give one release a unique id.`);
      }
      used.add(id);
      return { release, index, id };
    })
    .sort((a, b) => b.release.date.localeCompare(a.release.date));
}

function BrandMark() {
  return (
    <Svg width={26} height={26} viewBox="0 0 32 32" title="A sprig on a trellis">
      <Path
        d="M2 2H15V15C7 15 2 10 2 2ZM30 2H18V15C25 15 30 10 30 2ZM2 17H15V30C7 30 2 25 2 17ZM30 17H18V30C25 30 30 25 30 17Z"
        style={{ fill: MINT }}
      />
    </Svg>
  );
}

// Each petal has a broad outer cut and a narrow vein. Both turn around the same centre.
function flower(x: number, y: number, radius: number, petals: number, color: string, centre: string) {
  const path = (angle: number, vein: boolean) => {
    const p = (across: number, along: number) => {
      const dx = radius * across,
        dy = -radius * along;
      return [x + dx * Math.cos(angle) - dy * Math.sin(angle), y + dx * Math.sin(angle) + dy * Math.cos(angle)]
        .map((n) => n.toFixed(2))
        .join(" ");
    };
    return vein
      ? `M${p(0, 0.24)} Q${p(-0.07, 0.54)} ${p(0.01, 0.88)} Q${p(-0.015, 0.55)} ${p(0.03, 0.28)}Z`
      : `M${p(0, 0.1)} C${p(-0.19, 0.3)} ${p(-0.25, 0.87)} ${p(-0.1, 0.98)} Q${p(0.015, 1.08)} ${p(0.12, 0.95)} C${p(0.22, 0.8)} ${p(0.12, 0.28)} ${p(0, 0.1)}Z`;
  };
  const ringAngles = (count: number) => Array.from({ length: count }, (_, i) => (i * 2 * Math.PI) / count);
  const angles = ringAngles(petals);
  return (
    <>
      {angles.map((a) => (
        <Path key={a} d={path(a, false)} style={{ fill: color }} />
      ))}
      {angles.map((a) => (
        <Path key={a} d={path(a, true)} style={{ fill: centre }} />
      ))}
      <Circle cx={x} cy={y} r={radius * 0.21} style={{ fill: centre }} />
      {ringAngles(8).map((angle) => (
        <Circle
          key={angle}
          cx={x + Math.cos(angle) * radius * 0.13}
          cy={y + Math.sin(angle) * radius * 0.13}
          r={radius * 0.022}
          style={{ fill: color }}
        />
      ))}
    </>
  );
}

// A relief-print stamp, with paper cut out around the edge and a cancellation in green ink.
function Postage() {
  return (
    <Svg
      width={344}
      height={191}
      viewBox="0 0 310 172"
      title="An orange calendula on a perforated green postage stamp"
    >
      {[0, 1, 2, 3].map((i) => (
        <Path
          key={i}
          d={`M4 ${70 + i * 10} C32 ${50 + i * 10} 54 ${91 + i * 10} 89 ${68 + i * 10} S139 ${58 + i * 10} 162 ${66 + i * 10}`}
          style={{ fill: "transparent", stroke: LEAF, strokeWidth: 1.3 }}
        />
      ))}
      <Rect x={120} y={6} width={178} height={160} style={{ fill: MINT }} />
      {Array.from({ length: 18 }, (_, i) =>
        [6, 166].map((y) => <Circle key={i + "-" + y} cx={124 + i * 10} cy={y} r={3.25} style={{ fill: PAPER }} />),
      )}
      {Array.from({ length: 16 }, (_, i) =>
        [120, 298].map((x) => (
          <Circle key={i + "-" + x} cx={x} cy={11 + i * 10} r={3.25} style={{ fill: PAPER }} />
        )),
      )}
      <Rect x={130} y={16} width={158} height={140} style={{ fill: INK }} />
      <Rect
        x={134}
        y={20}
        width={150}
        height={132}
        style={{ fill: "transparent", stroke: MINT, strokeWidth: 0.8 }}
      />
      <Path
        d="M178 151Q206 129 216 78L219 78Q210 128 183 151Z M198 127Q170 127 153 99Q181 98 198 127Z M207 110Q209 83 232 82Q228 100 207 110Z M188 143Q206 119 245 117Q230 140 188 143Z"
        style={{ fill: MINT }}
      />
      <Path
        d="M158 102L193 123M193 140L239 120M211 104L228 86"
        style={{ stroke: INK, strokeWidth: 1.5, fill: "transparent" }}
      />
      {Array.from({ length: 12 }, (_, i) => (
        <Line
          key={i}
          x1={138 + i * 2.3}
          y1={24}
          x2={138}
          y2={24 + i * 2.3}
          style={{ stroke: MINT, opacity: 0.6, strokeWidth: 0.7 }}
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <Line
          key={i}
          x1={280 - i * 2.3}
          y1={148}
          x2={280}
          y2={148 - i * 2.3}
          style={{ stroke: MINT, opacity: 0.6, strokeWidth: 0.7 }}
        />
      ))}
      <Path
        d="M166 106L164 101M174 111L171 104M181 116L178 108M175 111L167 111M181 116L173 116M201 136L211 136M208 132L220 131M214 129L226 126M203 135L211 124M211 131L218 122M219 127L225 121"
        style={{ fill: "transparent", stroke: INK, strokeWidth: 0.9 }}
      />
      {flower(218, 69, 48, 15, ORANGE, INK)}
    </Svg>
  );
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString("en-GB", { ...options, timeZone: "UTC" }).replace(/\bSept\b/, "Sep");
}

function WeeklyPlate({ date }: { date: string }) {
  const start = new Date(date + "T12:00:00Z");
  const dates = [7, 14, 21].map((days) => {
    const day = new Date(start);
    day.setUTCDate(day.getUTCDate() + days);
    return day;
  });
  return (
    <Column
      style={{ backgroundColor: INK, color: PAPER, padding: [23, 28], gap: 16, mobile: { padding: 18, gap: 12 } }}
    >
      <Row stackOnMobile={false} style={{ alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <Text style={{ ...label, color: MINT, flex: "none" }}>REPEAT SCHEDULE</Text>
        <Svg width={32} height={18} title="Repeat weekly" viewBox="0 0 32 18">
          <Path
            d="M6 5H23Q28 5 28 10M26 13H9Q4 13 4 8M19 1L24 5L19 9M13 9L8 13L13 17"
            style={{ stroke: ORANGE, strokeWidth: 2.2, fill: "transparent" }}
          />
        </Svg>
      </Row>
      <Row stackOnMobile={false} style={{ gap: 12, mobile: { gap: 6 } }}>
        {dates.map((day, i) => (
          <Column
            key={day.toISOString()}
            style={{
              gap: 8,
              padding: [12, 16],
              backgroundColor: i === 0 ? ORANGE : MINT,
              color: INK,
              mobile: { padding: [9, 8], gap: 5 },
            }}
          >
            <Row
              stackOnMobile={false}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                border: { bottom: `1px solid ${LEAF}` },
                padding: [0, 0, 7],
              }}
            >
              <Text style={{ ...label, textTransform: "uppercase" }}>{formatDate(day, { weekday: "short" })}</Text>
              <Svg width={19} height={7} viewBox="0 0 19 7">
                <Circle cx={4} cy={3.5} r={2.5} style={{ fill: INK }} />
                <Circle cx={15} cy={3.5} r={2.5} style={{ fill: INK }} />
              </Svg>
            </Row>
            <Row stackOnMobile={false} style={{ alignItems: "end", justifyContent: "space-between" }}>
              <Text
                style={{
                  fontFamily: SERIF,
                  fontWeight: 500,
                  fontSize: 60,
                  letterSpacing: -3,
                  lineHeight: 1,
                  mobile: { fontSize: 34, letterSpacing: -1 },
                }}
              >
                {formatDate(day, { day: "2-digit" })}
              </Text>
              <Svg hidden={{ mobile: true }} width={32} height={32} viewBox="0 0 32 32">
                {flower(16, 16, 15, 10, LEAF, i === 0 ? ORANGE : MINT)}
              </Svg>
            </Row>
            <Text style={{ ...label, textTransform: "uppercase" }}>{formatDate(day, { month: "short" })}</Text>
          </Column>
        ))}
      </Row>
    </Column>
  );
}

function ColumnTicket({ x, accent }: { x: number; accent: boolean }) {
  return (
    <>
      <Rect x={x} y={38} width={19} height={2} style={{ fill: LEAF }} />
      <Rect x={x} y={44} width={27} height={accent ? 29 : 20} rx={2} style={{ fill: accent ? ORANGE : MINT }} />
      <Path d={`M${x + 4} 50h18m-18 4h12`} style={{ fill: "transparent", stroke: INK, strokeWidth: 1.4 }} />
      {accent ? (
        <Circle cx={x + 20} cy={66} r={3} style={{ fill: INK }} />
      ) : (
        <Rect x={x} y={68} width={27} height={11} rx={2} style={{ fill: MINT }} />
      )}
    </>
  );
}

function BoardPlate() {
  return (
    <Row
      stackOnMobile={false}
      style={{
        backgroundColor: MINT,
        maxWidth: 446,
        padding: [16, 20],
        alignItems: "center",
        gap: 20,
        mobile: { padding: 16, gap: 10 },
      }}
    >
      <Column style={{ gap: 8 }}>
        <Text style={label}>BOARD TEMPLATE</Text>
        <Text style={{ fontFamily: SERIF, fontSize: 30, lineHeight: 1.1, mobile: { fontSize: 23 } }}>
          Project kickoff
        </Text>
      </Column>
      <Svg
        width={180}
        height={110}
        viewBox="0 0 150 92"
        title="Two copies of a three-column board with a card in each column"
      >
        <Rect x={24} y={4} width={120} height={70} rx={3} style={{ fill: LEAF }} />
        <Rect x={16} y={11} width={120} height={70} rx={3} style={{ fill: LIGHT, stroke: INK, strokeWidth: 1.5 }} />
        <Rect x={7} y={18} width={120} height={70} rx={3} style={{ fill: PAPER, stroke: INK, strokeWidth: 1.5 }} />
        <Line x1={7} y1={32} x2={127} y2={32} style={{ stroke: INK, strokeWidth: 1.5 }} />
        {[16, 22, 28].map((x) => (
          <Circle key={x} cx={x} cy={25} r={1.6} style={{ fill: LEAF }} />
        ))}
        {[17, 52, 87].map((x, i) => (
          <ColumnTicket key={x} x={x} accent={i === 1} />
        ))}
      </Svg>
    </Row>
  );
}

const gutter = { padding: [0, 20] } as const;
const railWidth = 174;
const contentInset = 34;
type Entry = ReturnType<typeof releaseEntries>[number];

function DateRail({ entry, url, top, bottom = 0 }: { entry?: Entry; url: string; top: number; bottom?: number }) {
  return (
    <>
      <Column
        hidden={entry ? undefined : { mobile: true }}
        style={{
          width: railWidth,
          gap: 4,
          padding: [top, 12, bottom, 0],
          mobile: { padding: [top, 0, 12] },
        }}
      >
        {entry && (
          <>
            <Text style={{ fontFamily: MONO, fontSize: 16 }}>
              <Link href={url + "#" + entry.id}>
                {formatDate(new Date(entry.release.date + "T12:00:00Z"), {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </Link>
            </Text>
            {entry.release.version && <Text style={{ ...label, color: QUIET }}>v{entry.release.version}</Text>}
          </>
        )}
      </Column>
      <Column
        hidden={{ mobile: true }}
        style={{ width: contentInset, border: { left: hairline }, padding: [top, 0, 0] }}
      >
        {entry && <Text style={{ fontFamily: MONO, width: 10, fontSize: 16, color: INK }}>●</Text>}
      </Column>
    </>
  );
}

function NoticeIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 18 18" title="Service notice">
      <Path d="M9 1L17 16H1Z" style={{ fill: "transparent", stroke: RUST, strokeWidth: 1.4 }} />
      <Line x1={9} y1={6} x2={9} y2={10} style={{ stroke: RUST, strokeWidth: 1.6 }} />
      <Circle cx={9} cy={12.7} r={0.95} style={{ fill: RUST }} />
    </Svg>
  );
}

function ReleaseEntry({ entry, url, first }: { entry: Entry; url: string; first: boolean }) {
  const { release, id } = entry;
  const notice = release.type === "notice";
  const screenshot = release.type === "feature" ? release.screenshot : undefined;
  return (
    <Section id={id} style={gutter}>
      <Divider style={{ borderTop: first ? `2px solid ${INK}` : hairline }} />
      {release.type !== "small" && (
        <Row style={{ padding: notice ? [18, 0] : 0 }}>
          <DateRail entry={entry} url={url} top={notice ? 4 : 24} />
          <Column
            style={
              notice
                ? { padding: [20, 22], backgroundColor: OCHRE, border: "1px solid #C8B996", gap: 7 }
                : { gap: 12, padding: [24, 0, 0], mobile: { padding: 0 } }
            }
          >
            {notice && (
              <>
                <NoticeIcon />
                <Text style={{ ...label, color: RUST }}>SERVICE NOTE</Text>
              </>
            )}
            <Heading level={2} style={notice ? { fontSize: 28, mobile: { fontSize: 24 } } : undefined}>
              {release.title}
            </Heading>
            <Text style={{ color: notice ? INK : QUIET, padding: screenshot ? [0, 0, 14] : 0 }}>
              {release.summary}
            </Text>
            {release.type === "feature" && !screenshot && release.illustration === "weekly" && (
              <WeeklyPlate date={release.date} />
            )}
            {release.type === "feature" && !screenshot && release.illustration === "board" && <BoardPlate />}
          </Column>
        </Row>
      )}
      {release.type === "feature" && screenshot && (
        <Row>
          <DateRail url={url} top={0} />
          <Column style={{ padding: 10, backgroundColor: MINT, border: hairline, borderRadius: 4 }}>
            <Image
              field={`releases[${entry.index}].screenshot`}
              src={screenshot}
              alt={release.screenshotAlt || release.title}
              style={{ width: "100%" }}
            />
          </Column>
        </Row>
      )}
      {release.type !== "notice" &&
        release.changes.map((change, i) => {
          const start = i === 0 && release.type === "small";
          const last = i === release.changes.length - 1;
          const top = start ? 24 : i === 0 ? 16 : 9;
          const bottom = last ? 26 : 0;
          return (
            <Row key={i}>
              <DateRail entry={start ? entry : undefined} url={url} top={top} bottom={bottom} />
              <Column
                style={{
                  width: 102,
                  padding: [top, 12, bottom, 0],
                  alignItems: "start",
                  mobile: { padding: [start ? 0 : top, 0, 5] },
                }}
              >
                <Text style={{ apply: ["pill", change.kind], width: change.kind === "Improved" ? 86 : 62 }}>
                  {change.kind}
                </Text>
              </Column>
              <Column style={{ padding: [top, 0, bottom], mobile: { padding: [0, 0, bottom] } }}>
                <Text style={{ mobile: { fontSize: 16 } }}>{change.text}</Text>
              </Column>
            </Row>
          );
        })}
    </Section>
  );
}

export default function TrellisChangelog(props: Partial<ChangelogProps> = {}) {
  const { product, site, nav, intro, email, rss, social, handle, releases } = { ...example, ...props };
  const url = changelogUrl(site);
  const wordmark = props.wordmark || product;
  const items = nav.map((item) => ({
    ...item,
    text: hrefOf(item.href) === url ? item.text + " ●" : item.text,
  }));

  return (
    <Page
      theme={theme}
      width={1040}
      lang="en"
      title={product + " changelog"}
      description={intro}
      fonts={fonts}
      breakpoints={{ mobile: 870 }}
    >
      <Section style={{ padding: [14, 20], backgroundColor: INK }}>
        <Row style={{ alignItems: "center", gap: 8 }}>
          <Column hidden={{ mobile: true }} style={{ width: 26 }}>
            <BrandMark />
          </Column>
          <Column>
            <Text
              style={{ fontFamily: SERIF, fontSize: 28, lineHeight: 1.05, letterSpacing: -1.1, fontWeight: 600 }}
            >
              <Link href={site} style={{ color: PAPER, hover: { color: MINT } }}>
                {wordmark}
              </Link>
            </Text>
          </Column>
          <Column style={{ width: 345 }}>
            <Menu items={items} style={{ color: PAPER, justifyContent: "start", padding: [5, 9] }} />
          </Column>
        </Row>
      </Section>
      <Section style={{ padding: [34, 20] }}>
        <Row style={{ alignItems: "center", gap: 22 }}>
          <Column style={{ gap: 12 }}>
            <Heading level={1}>Changelog</Heading>
            <Text style={{ fontSize: 19, color: QUIET, maxWidth: 515, mobile: { fontSize: 17 } }}>{intro}</Text>
            <Text style={{ fontSize: 15, fontWeight: 600 }}>
              <Link href={email} style={{ textDecoration: "underline", hover: { color: RUST } }}>
                Email updates
              </Link>
              {"　　 "}
              <Link href={rss}>RSS ↗</Link>
              {"　　 "}
              <Link href={social}>{handle} ↗</Link>
            </Text>
          </Column>
          <Column hidden={{ mobile: true }} style={{ width: 344 }}>
            <Postage />
          </Column>
        </Row>
      </Section>
      {releaseEntries(releases).map((entry, i) => (
        <ReleaseEntry key={entry.id} entry={entry} url={url} first={i === 0} />
      ))}
      <Section style={{ padding: [0, 20, 32] }}>
        <Divider style={{ borderTop: `2px solid ${INK}` }} />
        <Row style={{ padding: [18, 0, 0], alignItems: "center", gap: 10 }}>
          {props.archive && (
            <Column style={{ alignItems: "start" }}>
              <Button
                href={props.archive}
                style={{
                  color: INK,
                  backgroundColor: PAPER,
                  border: `1px solid ${INK}`,
                  borderRadius: 20,
                  fontSize: 15,
                  fontWeight: 600,
                  padding: [7, 15],
                }}
              >
                ← Earlier releases
              </Button>
            </Column>
          )}
          <Column>
            <Text style={{ fontSize: 14, color: QUIET, textAlign: "right", mobile: { textAlign: "left" } }}>
              Published by {product}
            </Text>
          </Column>
        </Row>
      </Section>
    </Page>
  );
}
