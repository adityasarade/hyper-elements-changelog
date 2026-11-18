/**
 * Trellis, a fictional planning tool for small teams, keeps a public record of what shipped.
 *
 * The page borrows from seed catalogues and garden post: Fraunces on cream paper, a flower
 * cut into a postage stamp, and dated entries set down a green rule. The big releases get
 * a drawing of their own. Small fixes take just a line.
 */
import {
  Button, Circle, Column, defineTheme, Heading, Line, Link, Menu, Page, Path, Rect,
  Row, Section, Svg, Text, type LinkProps, type PageProps,
} from "@hyper-elements/react";

export const meta = {
  title: "Trellis changelog",
  description: "A product’s changelog: releases down a dated rail, each change marked new, improved or fixed, and the big ones drawn.",
  root: "Page",
};

const SITE = "https://trellis.example";
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
  { family: "Fraunces", src: "https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2", format: "woff2", weight: "100 900" },
  { family: "Instrument Sans", src: "https://fonts.gstatic.com/s/instrumentsans/v4/pxiTypc9vsFDm051Uf6KVwgkfoSxQ0GsQv8ToedPibnr0SZe1ZuWi3g.woff2", format: "woff2", weight: "400 700" },
  { family: "DM Mono", src: "https://fonts.gstatic.com/s/dmmono/v16/aFTU7PB1QTsUX8KYthqQBK6PYK0.woff2", format: "woff2", weight: 400 },
];
const label = { fontFamily: MONO, fontSize: 14, letterSpacing: 0.6, lineHeight: 1.25 } as const;
const hairline = `1px solid ${RULE}`;
const theme = defineTheme({
  colors: { background: PAPER, foreground: INK, primary: INK, primaryForeground: PAPER, border: RULE },
  fonts: { body: SANS, heading: SERIF }, fontSizes: { body: 17 }, lineHeights: { body: 1.5 },
  elements: {
    Heading: { fontWeight: 500, by: { level: {
      1: { fontSize: 96, lineHeight: 1.05, letterSpacing: -5, mobile: { fontSize: 46, letterSpacing: -2.4 } },
      2: { fontSize: 38, lineHeight: 1.12, letterSpacing: -1.3, mobile: { fontSize: 30, letterSpacing: -1 } },
    } } },
    Link: { color: INK, textDecoration: "none", hover: { color: RUST, textDecoration: "underline" } },
    Button: { hover: { color: PAPER, backgroundColor: LEAF } },
  },
  styles: {
    pill: { fontSize: 14, fontWeight: 600, lineHeight: 1.25, padding: [3, 10], borderRadius: 20, textAlign: "center" },
    New: { backgroundColor: "#DAE8CD", color: "#264C32" },
    Improved: { backgroundColor: "#DBE7E8", color: "#28505A" },
    Fixed: { backgroundColor: "#F1DFD2", color: "#753E23" },
  },
});

type Change = { kind: "New" | "Improved" | "Fixed"; text: string };
type Dated = { version: string; date: string };
type Illustration = "weekly" | "board";
export type Release = Dated & (
  | { type: "feature"; title: string; summary: string; illustration: Illustration; changes: Change[] }
  | { type: "small"; changes: Change[] }
  | { type: "notice"; title: string; summary: string }
);
export type ChangelogProps = {
  product: string; intro: string; email: LinkProps["href"]; rss: LinkProps["href"];
  social: LinkProps["href"]; handle: string; releases: Release[];
};
export const example: ChangelogProps = {
  product: "Trellis",
  intro: "Field notes on what’s new in Trellis, from the board to the smallest task.",
  email: SITE + "/notes/subscribe", rss: SITE + "/notes/feed.xml", social: SITE + "/community", handle: "@trellis",
  releases: [
    { type: "feature", version: "2.6", date: "2026-11-13", title: "Tasks on repeat",
      summary: "Give a task a day of the week. When you finish it, the next one appears on your board with its checklist and owner in place.",
      illustration: "weekly", changes: [
        { kind: "New", text: "Set a weekly repeat from any task’s due date." },
        { kind: "Improved", text: "Preview the next three dates before you save." },
      ] },
    { type: "small", version: "2.5.1", date: "2026-10-30", changes: [
      { kind: "Fixed", text: "Dragging a card keeps its checklist in order." },
      { kind: "Improved", text: "Board search now finds cards by their old titles." },
    ] },
    { type: "notice", version: "2.5", date: "2026-10-23", title: "Calendar feeds are moving",
      summary: "Old feed links retire on 1 December. Open Calendar sync on your board and copy the new link into your calendar." },
    { type: "feature", version: "2.4", date: "2026-10-09", title: "Reusable project boards",
      summary: "Keep a clean copy of the board you reach for every project. A new board starts with its columns and checklists, ready for the next job.",
      illustration: "board", changes: [
        { kind: "New", text: "Save any board as a team template from the board menu." },
        { kind: "Fixed", text: "Archived cards stay behind when you make a copy." },
      ] },
    { type: "small", version: "2.3.2", date: "2026-09-25", changes: [
      { kind: "Improved", text: "Weekends are easier to spot on the timeline." },
      { kind: "Fixed", text: "Milestones keep their dates when a teammate changes time zones." },
    ] },
    { type: "small", version: "2.3.1", date: "2026-09-11", changes: [
      { kind: "Fixed", text: "Long board names wrap in the project switcher." },
    ] },
  ],
};

function BrandMark() {
  return <Svg width={26} height={26} viewBox="0 0 32 32" title="A sprig on a trellis">
    <Path d="M2 2H15V15C7 15 2 10 2 2ZM30 2H18V15C25 15 30 10 30 2ZM2 17H15V30C7 30 2 25 2 17ZM30 17H18V30C25 30 30 25 30 17Z" style={{ fill: MINT }} />
  </Svg>;
}

// Each petal has a broad outer cut and a narrow vein. Both turn around the same centre.
function flower(x: number, y: number, radius: number, petals: number, color: string, centre: string) {
  const path = (angle: number, vein: boolean) => {
    const p = (across: number, along: number) => {
      const dx = radius * across, dy = -radius * along;
      return [x + dx * Math.cos(angle) - dy * Math.sin(angle), y + dx * Math.sin(angle) + dy * Math.cos(angle)]
        .map(n => n.toFixed(2)).join(" ");
    };
    return vein ? `M${p(0, .24)} Q${p(-.07, .54)} ${p(.01, .88)} Q${p(-.015,.55)} ${p(.03,.28)}Z`
      : `M${p(0,.10)} C${p(-.19,.30)} ${p(-.25,.87)} ${p(-.10,.98)} Q${p(.015,1.08)} ${p(.12,.95)} C${p(.22,.80)} ${p(.12,.28)} ${p(0,.10)}Z`;
  };
  const angles = Array.from({ length: petals }, (_, i) => i * 2 * Math.PI / petals);
  return <>
    {angles.map(a => <Path key={a} d={path(a, false)} style={{ fill: color }} />)}
    {angles.map(a => <Path key={a} d={path(a, true)} style={{ fill: centre }} />)}
    <Circle cx={x} cy={y} r={radius * .21} style={{ fill: centre }} />
    {Array.from({ length: 8 }, (_, i) => <Circle key={i} cx={x + Math.cos(i * 0.7854) * radius * .13} cy={y + Math.sin(i * 0.7854) * radius * .13} r={radius * .022} style={{ fill: color }} />)}
  </>;
}

// A relief-print stamp, with paper cut out around the edge and a cancellation in green ink.
function Postage({ compact = false }: { compact?: boolean }) {
  return <Svg width={compact ? 53 : 344} height={compact ? 49 : 191} viewBox={compact ? "113 0 192 172" : "0 0 310 172"} title="An orange calendula on a perforated green postage stamp">
    {[0, 1, 2, 3].map(i => <Path key={i} d={`M4 ${70+i*10} C32 ${50+i*10} 54 ${91+i*10} 89 ${68+i*10} S139 ${58+i*10} 162 ${66+i*10}`} style={{ fill: "transparent", stroke: LEAF, strokeWidth: 1.3 }} />)}
    <Rect x={120} y={6} width={178} height={160} style={{ fill: MINT }} />
    {Array.from({ length: 18 }, (_, i) => [6,166].map(y => <Circle key={i+"-"+y} cx={124+i*10} cy={y} r={3.25} style={{ fill: PAPER }} />))}
    {Array.from({ length: 16 }, (_, i) => [120,298].map(x => <Circle key={i+"-"+x} cx={x} cy={11+i*10} r={3.25} style={{ fill: PAPER }} />))}
    <Rect x={130} y={16} width={158} height={140} style={{ fill: INK }} />
    <Rect x={134} y={20} width={150} height={132} style={{ fill: "transparent", stroke: MINT, strokeWidth: .8 }} />
    <Path d="M178 151Q206 129 216 78L219 78Q210 128 183 151Z M198 127Q170 127 153 99Q181 98 198 127Z M207 110Q209 83 232 82Q228 100 207 110Z M188 143Q206 119 245 117Q230 140 188 143Z" style={{ fill: MINT }} />
    <Path d="M158 102L193 123M193 140L239 120M211 104L228 86" style={{ stroke: INK, strokeWidth: 1.5, fill: "transparent" }} />
    {Array.from({ length: 12 }, (_,i) => <Line key={i} x1={138+i*2.3} y1={24} x2={138} y2={24+i*2.3} style={{ stroke: MINT, opacity: .6, strokeWidth: .7 }} />)}
    {Array.from({ length: 9 }, (_,i) => <Line key={i} x1={280-i*2.3} y1={148} x2={280} y2={148-i*2.3} style={{ stroke: MINT, opacity: .6, strokeWidth: .7 }} />)}
    <Path d="M166 106L164 101M174 111L171 104M181 116L178 108M175 111L167 111M181 116L173 116M201 136L211 136M208 132L220 131M214 129L226 126M203 135L211 124M211 131L218 122M219 127L225 121" style={{ fill: "transparent", stroke: INK, strokeWidth: .9 }} />
    {flower(218, 69, 48, 15, ORANGE, INK)}
  </Svg>;
}

function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString("en-GB", { ...options, timeZone: "UTC" });
}

function WeeklyPlate({ date }: { date: string }) {
  const start = new Date(date + "T12:00:00Z");
  const dates = [1,2,3].map(week => new Date(start.getTime() + week * 7 * 86400000));
  return <Column style={{ backgroundColor: INK, color: PAPER, padding: [23, 28], gap: 16, mobile: { padding: 18, gap: 12 } }}>
    <Row stackOnMobile={false} style={{ alignItems: "center", justifyContent: "space-between", gap: 10 }}>
      <Text style={{ ...label, color: MINT, flex: "none" }}>REPEAT SCHEDULE</Text>
      <Svg width={32} height={18} title="Repeat weekly" viewBox="0 0 32 18">
        <Path d="M6 5H23Q28 5 28 10M26 13H9Q4 13 4 8M19 1L24 5L19 9M13 9L8 13L13 17" style={{ stroke: ORANGE, strokeWidth: 2.2, fill: "transparent" }} />
      </Svg>
    </Row>
    <Row stackOnMobile={false} style={{ gap: 12, mobile: { gap: 6 } }}>
      {dates.map((day,i) => <Column key={day.toISOString()} style={{ gap: 8, padding: [12,16], backgroundColor: i === 0 ? ORANGE : MINT, color: INK, mobile: { padding: [9,8], gap: 5 } }}>
        <Row stackOnMobile={false} style={{ alignItems: "center", justifyContent: "space-between", border: { bottom: `1px solid ${LEAF}` }, padding: [0,0,7] }}>
          <Text style={{ ...label, textTransform: "uppercase" }}>{formatDate(day, { weekday: "short" })}</Text>
          <Svg width={19} height={7} viewBox="0 0 19 7">
            <Circle cx={4} cy={3.5} r={2.5} style={{ fill: INK }} /><Circle cx={15} cy={3.5} r={2.5} style={{ fill: INK }} />
          </Svg>
        </Row>
        <Row stackOnMobile={false} style={{ alignItems: "end", justifyContent: "space-between" }}>
          <Text style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 60, letterSpacing: -3, lineHeight: 1, mobile: { fontSize: 34, letterSpacing: -1 } }}>{formatDate(day, { day: "2-digit" })}</Text>
          <Svg hidden={{ mobile: true }} width={32} height={32} viewBox="0 0 32 32">{flower(16,16,15,10,LEAF,i === 0 ? ORANGE : MINT)}</Svg>
        </Row>
        <Text style={{ ...label, textTransform: "uppercase" }}>{formatDate(day, { month: "short" })}</Text>
      </Column>)}
    </Row>
  </Column>;
}

function ColumnTicket({ x, accent }: { x: number; accent: boolean }) {
  return <>
    <Rect x={x} y={38} width={19} height={2} style={{ fill: LEAF }} />
    <Rect x={x} y={44} width={27} height={accent ? 29 : 20} rx={2} style={{ fill: accent ? ORANGE : MINT }} />
    <Path d={`M${x+4} 50h18m-18 4h12`} style={{ fill: "transparent", stroke: INK, strokeWidth: 1.4 }} />
    {accent
      ? <Circle cx={x+20} cy={66} r={3} style={{ fill: INK }} />
      : <Rect x={x} y={68} width={27} height={11} rx={2} style={{ fill: MINT }} />}
  </>;
}

function BoardPlate() {
  return <Row stackOnMobile={false} style={{ backgroundColor: MINT, padding: [18,28], alignItems: "center", gap: 20, mobile: { padding: 16, gap: 10 } }}>
    <Column style={{ gap: 8 }}>
      <Text style={label}>BOARD TEMPLATE</Text>
      <Text style={{ fontFamily: SERIF, fontSize: 30, lineHeight: 1.1, mobile: { fontSize: 23 } }}>Project kickoff</Text>
    </Column>
    <Svg width={150} height={92} viewBox="0 0 150 92" title="Two copies of a three-column board with a card in each column">
      <Rect x={24} y={4} width={120} height={70} rx={3} style={{ fill: LEAF }} />
      <Rect x={16} y={11} width={120} height={70} rx={3} style={{ fill: LIGHT, stroke: INK, strokeWidth: 1.5 }} />
      <Rect x={7} y={18} width={120} height={70} rx={3} style={{ fill: PAPER, stroke: INK, strokeWidth: 1.5 }} />
      <Line x1={7} y1={32} x2={127} y2={32} style={{ stroke: INK, strokeWidth: 1.5 }} />
      {[16,22,28].map(x=><Circle key={x} cx={x} cy={25} r={1.6} style={{ fill: LEAF }} />)}
      {[17,52,87].map((x,i) => <ColumnTicket key={x} x={x} accent={i === 1} />)}
    </Svg>
  </Row>;
}

function Changes({ changes }: { changes: Change[] }) {
  return <Column style={{ gap: 10 }}>
    {changes.map((change, i) => <Row key={i} stackOnMobile={false} style={{ alignItems: "start", gap: 12, mobile: { gap: 10 } }}>
      <Column style={{ width: 90, alignItems: "start" }}>
        <Text style={{ apply: ["pill", change.kind] }}>{change.kind}</Text>
      </Column>
      <Text style={{ lineHeight: 1.5, mobile: { fontSize: 16 } }}>{change.text}</Text>
    </Row>)}
  </Column>;
}

function ReleaseEntry({ release }: { release: Release }) {
  const day = formatDate(new Date(release.date + "T12:00:00Z"), { day: "numeric", month: "short", year: "numeric" });
  return <Row style={{ border: { top: hairline }, gap: 36, mobile: { gap: 14, padding: [22,0] } }}>
    <Column style={{ width: 174, padding: [26,0], border: { right: hairline }, gap: 6, mobile: { width: "100%", padding: 0, border: "0px solid transparent" } }}>
      <Row stackOnMobile={false} style={{ width: 142, gap: 5, alignItems: "center", flexWrap: "wrap", mobile: { width: "100%", gap: 10 } }}>
        <Text style={{ fontFamily: MONO, fontSize: 17, flex: "none", mobile: { fontSize: 15 } }}>{day}</Text>
        <Text style={{ ...label, color: QUIET, flex: "none" }}>v{release.version}</Text>
      </Row>
    </Column>
    <Column style={{ padding: [24,0,28], gap: 16, mobile: { padding: 0 } }}>
      {release.type === "feature" && <>
        <Heading level={2}>{release.title}</Heading>
        <Text style={{ color: QUIET, maxWidth: 700 }}>{release.summary}</Text>
        {release.illustration === "weekly" ? <WeeklyPlate date={release.date} /> : <BoardPlate />}
      </>}
      {release.type === "notice" && <Column style={{ padding: [20,24], backgroundColor: OCHRE, border: "1px solid #C8B996", gap: 8, mobile: { padding: 18 } }}>
        <Row stackOnMobile={false} style={{ gap: 8, alignItems: "center" }}>
          <Svg width={17} height={17} viewBox="0 0 18 18" title="Notice">
            <Path d="M9 1L17 16H1Z" style={{ fill: "transparent", stroke: RUST, strokeWidth: 1.4 }} />
            <Line x1={9} y1={6} x2={9} y2={10} style={{ stroke: RUST, strokeWidth: 1.6 }} />
            <Circle cx={9} cy={12.7} r={.95} style={{ fill: RUST }} />
          </Svg>
          <Text style={{ ...label, color: RUST }}>SERVICE NOTE</Text>
        </Row>
        <Heading level={2} style={{ fontSize: 27, letterSpacing: -.6, mobile: { fontSize: 24 } }}>{release.title}</Heading>
        <Text>{release.summary}</Text>
      </Column>}
      {release.type !== "notice" && <Changes changes={release.changes} />}
    </Column>
  </Row>;
}

const gutter = { padding: [0,48], mobile: { padding: [0,20] } } as const;
export default function TrellisChangelog(props: Partial<ChangelogProps> = {}) {
  const { product, intro, email, rss, social, handle, releases } = { ...example, ...props };
  const ordered = [...releases].sort((a,b) => b.date.localeCompare(a.date));
  return <Page theme={theme} width={1096} lang="en" title={product + " changelog"} description={intro} fonts={fonts} breakpoints={{ mobile: 870 }}>
    <Section style={{ backgroundColor: INK, padding: [15,48], mobile: { padding: [14,20] } }}>
      <Row stackOnMobile={false} style={{ alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 15, mobile: { gap: 7 } }}>
        <Row stackOnMobile={false} style={{ flex: "none", alignItems: "center", gap: 8 }}>
          <BrandMark />
          <Text style={{ fontFamily: SERIF, fontSize: 28, mobile: { fontSize: 23 }, lineHeight: 1.05, letterSpacing: -1.1, fontWeight: 600, flex: "none" }}>
            <Link href={SITE} style={{ color: PAPER, hover: { color: MINT } }}>{product}</Link>
          </Text>
        </Row>
        <Row stackOnMobile={false} style={{ flex: "none", alignItems: "center", gap: 22, mobile: { gap: 10 } }}>
          {[["Product", "/product"], ["Pricing", "/pricing"]].map(([text, path]) => (
            <Menu key={path} items={[{ text, href: SITE + path }]} style={{ color: PAPER, fontSize: 14, flex: "none", padding: [5,0] }} />
          ))}
          <Text style={{ fontSize: 14, flex: "none", fontWeight: 600 }}><Link attrs={{ "aria-current": "page" }} href={SITE + "/changelog"} style={{ color: MINT, textDecoration: "underline", hover: { color: PAPER } }}>Changelog</Link></Text>
          <Menu items={[{ text: "Sign in", href: SITE + "/login" }]} style={{ color: PAPER, fontSize: 14, flex: "none", padding: [5,0] }} />
        </Row>
      </Row>
    </Section>
    <Section style={{ padding: [45,48,36], mobile: { padding: [26,20,24] } }}>
      <Row stackOnMobile={false} style={{ alignItems: "center", gap: 20 }}>
        <Column style={{ gap: 12 }}>
          <Row stackOnMobile={false} style={{ alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <Heading level={1}>Changelog</Heading>
            <Column hidden={{ desktop: true }} style={{ width: 53 }}><Postage compact /></Column>
          </Row>
          <Text style={{ fontSize: 19, maxWidth: 515, color: QUIET, mobile: { fontSize: 17 } }}>{intro}</Text>
          <Row stackOnMobile={false} style={{ gap: 18, alignItems: "center", padding: [4,0,0], flexWrap: "wrap" }}>
            <Button href={email} style={{ backgroundColor: PAPER, color: INK, border: `1px solid ${INK}`, padding: [6,13], borderRadius: 20, fontSize: 14, fontWeight: 600, flex: "none" }}>Email updates</Button>
            <Text style={{ fontSize: 14, flex: "none" }}><Link href={rss}>RSS ↗</Link></Text>
            <Text style={{ fontSize: 14, flex: "none" }}><Link href={social}>{handle} ↗</Link></Text>
          </Row>
        </Column>
        <Column hidden={{ mobile: true }} style={{ width: 344, alignItems: "end" }}><Postage /></Column>
      </Row>
    </Section>
    <Section style={gutter}>
      <Column style={{ border: { top: `2px solid ${INK}` } }}>
        {ordered.map((release,i) => <ReleaseEntry key={i} release={release} />)}
      </Column>
    </Section>
    <Section style={{ padding: [0,48,40], mobile: { padding: [0,20,26] } }}>
      <Row stackOnMobile={false} style={{ padding: [20,0,0], border: { top: `2px solid ${INK}` }, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <Text style={{ fontWeight: 600, flex: "none" }}><Link href={SITE + "/changelog/archive"}>← Earlier releases</Link></Text>
        <Text style={{ fontSize: 14, color: QUIET, flex: "none" }}>Published by {product}</Text>
      </Row>
    </Section>
  </Page>;
}
