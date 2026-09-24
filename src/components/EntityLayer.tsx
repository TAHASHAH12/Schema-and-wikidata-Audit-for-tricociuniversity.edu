import { useState } from "react";
import type { EntityModel, Provenance } from "../types";
import model from "../data/entityModel.json";
import prov from "../data/provenance.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const d = model as unknown as EntityModel;
const p = prov as unknown as Provenance;

export default function EntityLayer() {
  const samples = d.samplePages.filter((s) => s.entities.length > 0);
  const [sel, setSel] = useState(samples[0]?.url ?? "");
  const cur = samples.find((s) => s.url === sel) ?? samples[0];
  const t = d.totals;

  return (
    <section className="section" id="entities">
      <div className="container">
        <div className="eyebrow">Entity layer</div>
        <h2>Naming the things each page is actually about</h2>
        <p className="lead">
          Schema types say what <em>kind</em> of thing a page is. Wikidata identifiers say{" "}
          <span className="u-lm">which</span> thing. A programme page can say it is about cosmetology
          the discipline, the cosmetologist occupation, and the city its campus sits in &mdash; each
          one an identifier a machine can cross-reference against every other source that uses it.
        </p>
        <p className="lead" style={{ marginTop: 0 }}>
          This vertical is unusually well served. The university has its own Wikidata item, its
          founder has one, every campus city has one, and every occupation these programmes lead to
          has one. That is rare, and it is the reason the density here is achievable honestly.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value={fmtInt(t.v2Entities)} label="Verified entity references" good
            sub={`across ${fmtInt(t.contentPages)} pages`} />
          <ScoreCard value={t.v2PerPage.toFixed(2)} label="Entities per page"
            sub="where the site currently declares none" />
          <ScoreCard value={fmtInt(t.distinctEntities)} label="Distinct entities used"
            sub="each resolved against the live API" />
          <ScoreCard value={fmtInt(t.candidatePool)} label="Candidates screened"
            sub={`harvested across ${t.classBlocks} Wikidata classes`} />
          <ScoreCard value={fmtInt(p.coverage.noEntity)} label="Terms with no entity" warn
            sub={`of ${fmtInt(p.coverage.vocabTerms)} — reported, not invented`} />
          <ScoreCard value="0" label="Model-generated identifiers" good
            sub="nothing here came from an LLM guess" />
        </div>

        <h3 style={{ margin: "34px 0 12px" }}>What a page carries, and why</h3>
        <div className="row" style={{ flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
          {samples.slice(0, 10).map((s) => (
            <button
              key={s.url}
              className="navchip"
              onClick={() => setSel(s.url)}
              style={
                s.url === sel
                  ? { background: "var(--ny)", borderColor: "var(--ink)", fontWeight: 600 }
                  : undefined
              }
            >
              {s.segment} &middot; {s.entities.length}
            </button>
          ))}
        </div>

        {cur && (
          <div className="card">
            <div style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)", marginBottom: 12 }}>
              {cur.url.replace("https://www.tricociuniversity.edu", "")}
            </div>
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Relation</th>
                    <th>Wikidata</th>
                    <th>Entity</th>
                    <th>Why it applies</th>
                  </tr>
                </thead>
                <tbody>
                  {cur.entities.map((e) => (
                    <tr key={e.relation + e.qid}>
                      <td style={{ fontFamily: "var(--mono)", fontSize: 12 }}>{e.relation}</td>
                      <td style={{ fontFamily: "var(--mono)", fontSize: 12 }}>{e.qid}</td>
                      <td style={{ fontSize: 13 }}>
                        <strong>{e.label}</strong>
                        {e.desc && (
                          <div style={{ fontSize: 11.5, color: "var(--ink-mute)" }}>{e.desc}</div>
                        )}
                      </td>
                      <td style={{ fontSize: 12.5, color: "var(--muted)" }}>{e.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid2" style={{ marginTop: 28 }}>
          <div className="card">
            <h4>{fmtInt(p.coverage.exact)} terms resolved exactly</h4>
            <p style={{ marginBottom: 0 }}>
              The term is the entity: an occupation, a discipline, a city, a treatment.
            </p>
          </div>
          <div className="card">
            <h4>{fmtInt(p.coverage.noEntity)} terms have nothing to point at</h4>
            <p style={{ marginBottom: 0 }}>
              Brand phrasing, navigation and long-tail search language. Reported as absent rather than
              matched to the nearest plausible item.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
