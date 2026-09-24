import type { SchemaFindings } from "../types";
import findings from "../data/schemaFindings.json";
import ScoreCard from "./ScoreCard";
import { fmtInt } from "../utils/format";

const f = findings as unknown as SchemaFindings;

export default function Campuses() {
  const t = f.totals;
  const campusTraffic =
    f.coverage.find((c) => c.segment === "CAMPUS")?.traffic ?? 0;

  return (
    <section className="section" id="campuses">
      <div className="container">
        <div className="eyebrow">The campus problem</div>
        <h2>Every campus page says the school is in Park Ridge</h2>
        <p className="lead">
          This is the finding to fix first. A school with campuses across three states depends on each
          location being findable in its own city. The markup currently works against that:{" "}
          <span className="u-lm">
            {t.campusHqOnly} of {t.campusPages} campus pages
          </span>{" "}
          carry only the corporate head-office address, and {fmtInt(t.hqPages)} pages sitewide assert
          it.
        </p>

        <div className="scorecards" style={{ marginTop: 28 }}>
          <ScoreCard value={`${t.campusHqOnly}/${t.campusPages}`} label="Campus pages with only the HQ address" warn
            sub="they inherit the sitewide organisation node" />
          <ScoreCard value={fmtInt(t.hqPages)} label="Pages sitewide asserting Park Ridge" warn
            sub={`out of ${fmtInt(t.pages)} crawled`} />
          <ScoreCard value={fmtInt(campusTraffic)} label="Monthly visits to campus pages"
            sub="the traffic this affects" />
          <ScoreCard value="0" label="Campuses with geo coordinates of their own" warn
            sub="no campus declares a distinct location" />
        </div>

        <div className="skyband" style={{ marginTop: 32 }}>
          <h2>Why this one matters more than the others</h2>
          <p>
            A search engine reading a campus page finds a page about a school, an address in Park
            Ridge, and nothing that distinguishes this location from the other sixty-seven. There is
            no geo point, no opening hours, no per-campus contact point, and no statement that this
            place is part of a larger organisation.
          </p>
          <p style={{ marginBottom: 0 }}>
            The pages rank on their content today. They do so without any structured signal that the
            campus exists as a place, which is the signal local results are built on.
          </p>
        </div>

        <h3 style={{ margin: "34px 0 10px" }}>What a campus page should declare</h3>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Today</th>
                <th>Should be</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["@type", "CollegeOrUniversity (sitewide, shared)", "School, with parentOrganization pointing at the university"],
                ["address", "222 S. Prospect Ave, Park Ridge", "The campus's own street address"],
                ["geo", "absent", "GeoCoordinates for this campus"],
                ["telephone", "one shared support number", "The campus's own number"],
                ["openingHoursSpecification", "absent", "Per-campus hours"],
                ["areaServed", "absent", "The city and surrounding area this campus serves"],
                ["aggregateRating", "on a Product node, 18 pages", "On the campus organisation, where it belongs"],
                ["sameAs", "corporate social profiles", "The campus's own Google Business Profile"],
              ].map(([p, now, should]) => (
                <tr key={p}>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{p}</td>
                  <td style={{ fontSize: 13, color: "var(--warn)" }}>{now}</td>
                  <td style={{ fontSize: 13 }}>{should}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
