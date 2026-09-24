import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";

const f = findings as unknown as SchemaFindings;

const ITEMLIST = `{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1,
      "url": "https://www.tricociuniversity.edu/programs/cosmetology/" },
    { "@type": "ListItem", "position": 2,
      "url": "https://www.tricociuniversity.edu/programs/esthetics/" },
    { "@type": "ListItem", "position": 3,
      "url": "https://www.tricociuniversity.edu/programs/barber-school/" },
    { "@type": "ListItem", "position": 4,
      "url": "https://www.tricociuniversity.edu/programs/nail-technology/" },
    { "@type": "ListItem", "position": 5,
      "url": "https://www.tricociuniversity.edu/programs/teacher-training/" }
  ]
}`;

export default function Courses() {
  return (
    <section className="section" id="courses">
      <div className="container">
        <div className="eyebrow">Course rich results</div>
        <h2>One missing block stands between here and a course carousel</h2>
        <p className="lead">
          This is the cheapest win in the audit. The five programme pages already carry{" "}
          <span className="u-lm">well-formed Course markup</span> &mdash; provider, prerequisites,
          credential awarded, time required, and course instances with real schedules. That is better
          than anything a competitor in this set ships.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          Google&rsquo;s course list rich result needs at least three courses <em>and</em> ItemList
          markup on a summary page. There is no ItemList anywhere on the site, and{" "}
          <code>/programs/</code> is typed as an Article.
        </p>

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4 style={{ color: "var(--ok)" }}>Already in place</h4>
            <ul className="clean">
              {f.coursePages.map((c) => (
                <li key={c}>
                  <code>{c}</code>
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 0 }}>
              Five courses, each with the properties Google requires.
            </p>
          </div>
          <div className="card">
            <h4 style={{ color: "var(--warn)" }}>Missing</h4>
            <ul className="clean">
              <li>
                <code>ItemList</code> on <code>/programs/</code>
              </li>
              <li>
                That is the whole gap. One block, one page.
              </li>
            </ul>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 0 }}>
              Requirement confirmed against Google&rsquo;s course documentation on the day of the
              audit, not from memory.
            </p>
          </div>
        </div>

        <h3 style={{ margin: "32px 0 10px" }}>The block to add</h3>
        <pre>
          <code>{ITEMLIST}</code>
        </pre>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>Then fix the {f.programNoCourse.length} sub-pages</h2>
          <p style={{ marginBottom: 0 }}>
            Under <code>/programs/</code> there are {f.programNoCourse.length} further pages &mdash;
            curriculum breakdowns, career paths, schedules, instructor profiles &mdash; all typed as
            generic Articles. They are parts of an educational programme. Linking them to their parent
            Course with <code>hasPart</code> and <code>isPartOf</code> turns a flat set of articles
            into a described programme structure.
          </p>
        </div>
      </div>
    </section>
  );
}
