import type { Industry } from "../types";
import ind from "../data/industry.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const i = ind as unknown as Industry;

const LABEL: Record<string, string> = {
  "the client": "tricociuniversity.edu",
  "known competitor": "other beauty schools",
  "UGC / social": "YouTube, Reddit, TikTok, Instagram",
  reference: "Wikipedia and reference sites",
  "other site": "everyone else — salons, publishers, state boards, job sites",
};

export default function Industry_() {
  const kinds = Object.entries(i.byKind).sort((a, b) => b[1] - a[1]);
  const total = kinds.reduce((s, [, n]) => s + n, 0);
  const ugc = i.markupByKind["UGC / social"];

  return (
    <section className="section" id="industry">
      <div className="container">
        <div className="eyebrow">Industry snapshot</div>
        <h2>What the whole category looks like, not just this site</h2>
        <p className="lead">
          We took {i.keywords} keywords spanning {fmtInt(i.volume)} monthly searches across
          programmes, licensing, careers and technique, pulled the top ten results for each, and read
          the structured data on every page that ranked &mdash;{" "}
          <span className="u-lm">{fmtInt(i.urls)} pages across {i.domains} domains</span>.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          The first thing it shows is how fragmented this category is. {i.domains} different domains
          across {fmtInt(i.urls)} results means almost nobody holds a position twice. There is no
          incumbent to displace &mdash; which cuts both ways.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value={fmtInt(i.urls)} label="Ranking pages read"
            sub={`${i.read} readable across ${i.domains} domains`} />
          <ScoreCard value={`${i.aiPct}%`} label="Keywords with an AI overview"
            sub={`${i.aiKeywords} of ${i.keywords}`} />
          <ScoreCard value={String(i.clientAi)} label="AI answers citing this site"
            sub="third behind YouTube and Google" />
          <ScoreCard value={`${Math.round((i.byKind["the client"] / total) * 100)}%`} warn
            label="Share of top-ten slots held"
            sub={`${i.byKind["the client"]} of ${fmtInt(total)} ranking positions`} />
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Who holds the top ten</h3>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr><th>Type of site</th><th>Share</th><th>Who that is</th></tr>
            </thead>
            <tbody>
              {kinds.map(([k, n]) => (
                <tr key={k}>
                  <td style={{ fontSize: 13.5, fontWeight: k === "the client" ? 700 : 400 }}>{k}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {Math.round((n / total) * 100)}% ({n})
                  </td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{LABEL[k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>This is a content category, not a commerce one</h2>
          <p>
            Of {fmtInt(i.urls)} ranking pages, {i.pageTypes["product page"] ?? 0} are product pages and{" "}
            {i.pageTypes["category / listing"] ?? 0} are listings. Everything else is editorial,
            licensing guidance, career explainers, video and forum threads. Shopping carousels
            appeared on only {i.carouselPct}% of these keywords, against 92% in a retail category we
            measured for comparison.
          </p>
          <p style={{ marginBottom: 0 }}>
            Which means the structured data that matters here is not commerce markup. It is the
            markup that describes a programme, a licence, an occupation and a place &mdash; exactly
            the four things missing from the campus and programme pages.
          </p>
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>Who you are actually competing with</h3>
        <p style={{ fontSize: 14, maxWidth: "72ch" }}>
          Not the schools you would name. The six domains holding the most top-ten positions in this
          category are all social platforms, and a job board ranks as often as the largest competing
          school.
        </p>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Top-ten slots</th>
                <th>Type</th>
                <th>Carries structured data</th>
              </tr>
            </thead>
            <tbody>
              {i.domainRows.slice(0, 14).map((r) => (
                <tr key={r.domain} style={r.kind === "the client" ? { background: "var(--bl)" } : undefined}>
                  <td style={{ fontSize: 13.5, fontWeight: r.kind === "the client" ? 700 : 400 }}>
                    {r.domain}
                  </td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.pages}</td>
                  <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{r.kind}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {r.anyLd === null ? <span style={{ color: "var(--muted)" }}>not readable</span> : `${r.anyLd}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 style={{ margin: "32px 0 10px" }}>The named competitors</h3>
        <p style={{ fontSize: 14, maxWidth: "72ch" }}>
          The beauty schools and directories competing for the same terms, with how often each one
          holds a top-ten position and whether their pages carry structured data.
        </p>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr><th>Competitor</th><th>Top-ten slots</th><th>Pages read</th><th>Carries structured data</th></tr>
            </thead>
            <tbody>
              {i.competitors.map((c) => (
                <tr key={c.domain}>
                  <td style={{ fontSize: 13.5 }}>{c.domain}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{c.pages}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{c.read}/{c.pages}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                    {c.anyLd === null
                      ? <span style={{ color: "var(--muted)" }}>blocked our request</span>
                      : `${c.anyLd}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--muted)" }}>
          Paul Mitchell holds the most competitor slots and blocks automated requests, so its markup
          is unknown rather than absent. Indeed and MapQuest appearing here matters: prospective
          students reach this category through job boards and map listings as much as through school
          websites, and neither is a page anyone optimises.
        </p>

        <h3 style={{ margin: "34px 0 10px" }}>Who the AI answers cite</h3>
        <p style={{ fontSize: 14, maxWidth: "72ch" }}>
          AI overviews appeared on {i.aiKeywords} of {i.keywords} keywords. This site is cited{" "}
          {i.clientAi} times &mdash; third, behind only YouTube and Google itself, and ahead of every
          competing school. That is a stronger position than the ranking share suggests.
        </p>
        <div className="tbl-wrap">
          <table>
            <thead><tr><th>Domain</th><th>AI overviews citing it</th></tr></thead>
            <tbody>
              {i.aiTop.map((a) => (
                <tr key={a.domain}>
                  <td style={{
                    fontSize: 13.5,
                    fontWeight: a.domain.includes("tricoci") ? 700 : 400,
                  }}>
                    {a.domain}
                  </td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{a.n}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>The Bureau of Labor Statistics is in that list</h4>
            <p style={{ marginBottom: 0 }}>
              <code>bls.gov</code> is cited three times. When someone asks an assistant what a
              cosmetologist earns or whether it is a good career, the answer is grounded in
              occupational data. No page on this site carries Occupation markup, so nothing connects
              these programmes to the jobs the answers are about.
            </p>
          </div>
          <div className="card">
            <h4>Social holds {Math.round((i.byKind["UGC / social"] / total) * 100)}% of the top ten with almost no markup</h4>
            <p style={{ marginBottom: 0 }}>
              {ugc?.n} YouTube, Reddit and TikTok results rank here, and only {ugc?.anyLd}% carry any
              structured data at all. They are winning on content and engagement, not on markup
              &mdash; which is where a school with real programmes and real outcomes should be able
              to compete.
            </p>
          </div>
        </div>

        <p style={{ marginTop: 22, fontSize: 13, color: "var(--muted)" }}>
          {i.unread} of the {fmtInt(i.urls)} ranking pages could not be read, mostly social platforms
          that block automated requests. Those are recorded as unread, never as pages without markup.
        </p>
      </div>
    </section>
  );
}
