import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";

const f = findings as unknown as SchemaFindings;
const tick = (b: boolean) => (b ? "✓" : "—");

export default function Competitors() {
  return (
    <section className="section" id="competitors">
      <div className="container">
        <div className="eyebrow">Competitors</div>
        <h2>Nobody in this market is doing it properly</h2>
        <p className="lead">
          Structured data was read directly from the live pages of the seven domains that compete for
          the same terms, sampled by page role rather than at random &mdash; home, programme, campus
          and editorial &mdash; because the question is what a competitor puts on the page type we are
          trying to beat.
        </p>

        <div className="tbl-wrap" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Types</th>
                <th>Course</th>
                <th>Programme</th>
                <th>Local / place</th>
                <th>Occupation</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "var(--bl)" }}>
                <td>
                  <strong>tricociuniversity.edu</strong>
                  <div style={{ fontSize: 11.5, color: "var(--muted)" }}>this client</div>
                </td>
                <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>
                  <strong>{f.totals.types}</strong>
                </td>
                <td style={{ fontFamily: "var(--mono)" }}>{tick(true)}</td>
                <td style={{ fontFamily: "var(--mono)" }}>{tick(true)}</td>
                <td style={{ fontFamily: "var(--mono)", color: "var(--warn)" }}>{tick(false)}</td>
                <td style={{ fontFamily: "var(--mono)", color: "var(--warn)" }}>{tick(false)}</td>
              </tr>
              {f.competitors.map((c) => (
                <tr key={c.domain}>
                  <td style={{ fontSize: 13.5 }}>{c.domain}</td>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{c.types}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasCourse)}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasProgram)}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasLocal)}</td>
                  <td style={{ fontFamily: "var(--mono)" }}>{tick(c.hasOccupation)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>What this means</h4>
            <p style={{ marginBottom: 0 }}>
              Two of the seven ship no structured data at all, including one of the largest beauty
              school networks in the country. The strongest, ogleschool.edu, carries seventeen types
              and does use EducationalOccupationalProgram &mdash; but no competitor marks up
              occupations, and none marks up campuses as places.
            </p>
          </div>
          <div className="card">
            <h4>The opening</h4>
            <p style={{ marginBottom: 0 }}>
              This client already leads on type coverage. The gap between leading on{" "}
              <em>quantity</em> of markup and leading on the markup that actually earns results is
              small, specific, and currently uncontested. Course carousels and per-campus place data
              are both available to whoever implements them first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
