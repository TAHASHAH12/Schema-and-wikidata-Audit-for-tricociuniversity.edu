import type { EntityModel, SchemaFindings } from "../types";
import model from "../data/entityModel.json";
import findings from "../data/schemaFindings.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const d = model as unknown as EntityModel;
const f = findings as unknown as SchemaFindings;

export default function Hero() {
  const t = d.totals;
  const critical = f.defects.filter((x) => x.severity === "Critical").length;

  return (
    <header className="hero" id="overview">
      <div className="container">
        <div className="eyebrow">Schema &amp; Wikidata audit &middot; September 2026</div>
        <h1>
          A lot of markup. Very little of it about <em>the page</em>.
        </h1>
        <p className="lead">
          Every indexable page on tricociuniversity.edu was crawled and every JSON-LD block parsed
          &mdash; {fmtInt(f.totals.pages)} pages, {f.totals.types} distinct schema.org types. That is
          more structured data than any competitor in this market ships, and two of the seven ship
          none at all. The issue is not volume. It is that the same sitewide block describing the
          institution is repeated on almost every page, while the things that would earn a search
          feature &mdash; a campus as a place, a programme as a course list, a career page as an
          occupation &mdash; are absent.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          <span className="u-lm">
            {f.totals.campusHqOnly} of {f.totals.campusPages} campus pages
          </span>{" "}
          tell search engines the school is located at the head office. Five programme pages carry
          valid Course markup that cannot earn a carousel because one block is missing from one page.
        </p>

        <div className="scorecards" style={{ marginTop: 30 }}>
          <ScoreCard value={String(critical)} label="Critical findings" warn
            sub="both cost visibility today" />
          <ScoreCard value={`${f.totals.campusHqOnly}/${f.totals.campusPages}`}
            label="Campus pages with the wrong address" warn
            sub="they inherit the head-office node" />
          <ScoreCard value="5" label="Course pages already valid" good
            sub="missing only an ItemList to qualify" />
          <ScoreCard value={fmtInt(t.v2Entities)} label="Verified Wikidata references added" good
            sub={`from ${fmtInt(t.distinctEntities)} distinct entities`} />
          <ScoreCard value={t.v2PerPage.toFixed(2)} label="Entities per page, after"
            sub="the site declares none today" />
          <ScoreCard value="0" label="Unverified identifiers" good
            sub="every one resolved against the live API" />
        </div>
      </div>
    </header>
  );
}
