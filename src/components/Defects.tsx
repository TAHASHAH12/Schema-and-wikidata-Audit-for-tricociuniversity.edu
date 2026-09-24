import { useState } from "react";
import type { SchemaFindings, Defect } from "../types";
import findings from "../data/schemaFindings.json";
import { fmtInt } from "../utils/format";

const f = findings as unknown as SchemaFindings;

const TONE: Record<Defect["severity"], { bg: string; label: string }> = {
  Critical: { bg: "var(--warn)", label: "Critical" },
  High: { bg: "var(--tp)", label: "High" },
  Medium: { bg: "var(--bl)", label: "Medium" },
  Low: { bg: "var(--line)", label: "Low" },
};

export default function Defects() {
  const [open, setOpen] = useState<string | null>(f.defects[0]?.id ?? null);
  const counts = f.defects.reduce<Record<string, number>>((a, d) => {
    a[d.severity] = (a[d.severity] || 0) + 1;
    return a;
  }, {});

  return (
    <section className="section" id="defects">
      <div className="container">
        <div className="eyebrow">What is broken</div>
        <h2>Eight findings, two of them costing traffic today</h2>
        <p className="lead">
          The site is not short of structured data &mdash; {f.totals.types} distinct schema.org types
          across {fmtInt(f.totals.pages)} pages, which is more than any competitor in this set. The
          problem is that the markup describes the <em>organisation</em> almost everywhere and the{" "}
          <span className="u-lm">page</span> almost nowhere. Two findings are costing search
          visibility right now; the rest are the difference between markup that exists and markup that
          earns something.
        </p>

        <div className="scorecards" style={{ marginTop: 26, marginBottom: 28 }}>
          {(["Critical", "High", "Medium", "Low"] as const).map((s) => (
            <div className="score" key={s}>
              <div className="score-v" style={{ color: s === "Critical" ? "var(--warn)" : undefined }}>
                {counts[s] || 0}
              </div>
              <div className="score-l">{s} findings</div>
            </div>
          ))}
        </div>

        {f.defects.map((d) => {
          const isOpen = open === d.id;
          return (
            <div className="card" key={d.id} style={{ marginBottom: 12, padding: 0, overflow: "hidden" }}>
              <button
                onClick={() => setOpen(isOpen ? null : d.id)}
                aria-expanded={isOpen}
                style={{
                  width: "100%", textAlign: "left", background: "none", border: 0,
                  padding: "18px 20px", cursor: "pointer", display: "flex",
                  alignItems: "center", gap: 14, font: "inherit",
                }}
              >
                <span className="classchip" style={{ background: TONE[d.severity].bg, flexShrink: 0 }}>
                  {d.severity}
                </span>
                <span style={{ flex: 1, fontWeight: 600, fontSize: 15.5 }}>{d.title}</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--muted)", flexShrink: 0 }}>
                  {fmtInt(d.pages)} {d.pages === 1 ? "page" : "pages"}
                </span>
                <span aria-hidden style={{ color: "var(--muted)", flexShrink: 0 }}>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--line)" }}>
                  <p style={{ marginTop: 16, fontSize: 14.5 }}>{d.detail}</p>
                  <div style={{ background: "var(--bl)", borderRadius: 10, padding: "14px 16px" }}>
                    <div className="eyebrow" style={{ marginBottom: 6 }}>The fix</div>
                    <p style={{ margin: 0, fontSize: 14 }}>{d.fix}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
