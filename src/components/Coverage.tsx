import { useState } from "react";
import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";
import { fmtInt } from "../utils/format";

const f = findings as unknown as SchemaFindings;

// types that describe the ORGANISATION rather than the page it sits on
const SITEWIDE = new Set([
  "Organization", "CollegeOrUniversity", "ContactPoint", "PostalAddress",
  "Place", "Person", "WebSite", "ImageObject", "GovernmentOrganization",
]);

export default function Coverage() {
  const rows = f.coverage.filter((c) => c.pages > 0);
  const [sel, setSel] = useState(rows[0]?.segment ?? "");
  const cur = rows.find((r) => r.segment === sel) ?? rows[0];

  return (
    <section className="section" id="coverage">
      <div className="container">
        <div className="eyebrow">Markup by page type</div>
        <h2>The same nine types on almost every page</h2>
        <p className="lead">
          Averaged across the site the markup looks healthy. Broken down by page type it shows the
          real pattern: a large, well-formed block describing the institution is repeated everywhere,
          and very little describes the page it is attached to. A blog post, a campus and an
          admissions page currently carry almost identical structured data.
        </p>

        <div className="row" style={{ marginTop: 24, flexWrap: "wrap", gap: 8 }}>
          {rows.map((r) => (
            <button
              key={r.segment}
              className="navchip"
              onClick={() => setSel(r.segment)}
              style={
                r.segment === sel
                  ? { background: "var(--ny)", borderColor: "var(--ink)", fontWeight: 600 }
                  : undefined
              }
            >
              {r.segment} &middot; {r.pages}
            </button>
          ))}
        </div>

        {cur && (
          <div className="card" style={{ marginTop: 20 }}>
            <div
              style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 14,
              }}
            >
              <h3 style={{ margin: 0 }}>{cur.segment}</h3>
              <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)" }}>
                {fmtInt(cur.pages)} pages &middot; {fmtInt(cur.traffic)} est. monthly visits &middot;{" "}
                {cur.avgTypes} types per page
              </div>
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>schema.org type</th>
                    <th>Pages</th>
                    <th>Share</th>
                    <th>Describes</th>
                  </tr>
                </thead>
                <tbody>
                  {cur.types.map((t) => (
                    <tr key={t.type}>
                      <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{t.type}</td>
                      <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{t.pages}</td>
                      <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{t.pct}%</td>
                      <td style={{ fontSize: 13 }}>
                        {SITEWIDE.has(t.type) ? (
                          <span style={{ color: "var(--muted)" }}>the organisation</span>
                        ) : (
                          <strong>this page</strong>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p style={{ marginTop: 22, fontSize: 13.5, color: "var(--muted)" }}>
          Types marked &ldquo;the organisation&rdquo; are the sitewide identity block. They are
          correct and worth keeping &mdash; they are simply not page-level description, and they are
          what makes the coverage average look better than the page-level reality.
        </p>
      </div>
    </section>
  );
}
