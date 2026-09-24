const ROWS = [
  { type: "Course + ItemList", status: "Eligible once ItemList is added", tone: "ok",
    note: "Course list carousel. Five valid Course pages already exist; the summary page needs ItemList markup." },
  { type: "LocalBusiness / School", status: "Not eligible today", tone: "warn",
    note: "Knowledge panel and local surfaces. Needs per-campus address, geo and hours, which no campus page currently has." },
  { type: "Breadcrumb", status: "Earning", tone: "ok",
    note: "Present and valid on 611 pages." },
  { type: "Organization", status: "Earning", tone: "ok",
    note: "Logo and knowledge panel data. Well formed sitewide." },
  { type: "Review snippet", status: "At risk", tone: "warn",
    note: "The ratings sit on a Product node with no offer. Move them onto the school and they become valid." },
  { type: "Video", status: "Not implemented", tone: "mute",
    note: "The site hosts tours and student videos with no VideoObject markup." },
  { type: "EducationalOccupationalProgram", status: "No rich result", tone: "mute",
    note: "Worth keeping for entity clarity and AI answers, but it is not a SERP feature. Do not report it as one." },
  { type: "Occupation", status: "No rich result", tone: "mute",
    note: "Same: an entity signal, not a search feature. It is how a machine learns the programme leads to a real job." },
  { type: "FAQPage", status: "Removed by Google", tone: "warn",
    note: "The FAQ rich result was removed from Search on 7 May 2026. Keep the markup for AI citation; stop counting it." },
  { type: "Product", status: "Should be removed", tone: "warn",
    note: "A campus is not a product. This is the one type on the site that is actively wrong." },
];

const COLOR: Record<string, string | undefined> = {
  ok: "var(--ok)", warn: "var(--warn)", mute: "var(--muted)",
};

export default function RichResults() {
  return (
    <section className="section" id="serp">
      <div className="container">
        <div className="eyebrow">What earns rich results</div>
        <h2>Which of this markup Google actually rewards</h2>
        <p className="lead">
          Every row below was checked against Google&rsquo;s current developer documentation on the
          day of the audit rather than recalled. The distinction that matters: some structured data
          earns a visible search feature, and some only makes a page legible to machines. Both are
          worth doing. Only one should be described as a ranking win.
        </p>

        <div className="tbl-wrap" style={{ marginTop: 24 }}>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.type}>
                  <td style={{ fontFamily: "var(--mono)", fontSize: 12.5 }}>{r.type}</td>
                  <td style={{ fontSize: 13, color: COLOR[r.tone], fontWeight: 600 }}>{r.status}</td>
                  <td style={{ fontSize: 13 }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="skyband" style={{ marginTop: 30 }}>
          <h2>Say this out loud before anyone reports on it</h2>
          <p style={{ marginBottom: 0 }}>
            FAQ and EducationalOccupationalProgram produce no rich result. Keeping them is right,
            because AI answers and knowledge panels read structured data that never becomes a visible
            SERP feature. Reporting them as search wins is how a structured data programme loses
            credibility three months in.
          </p>
        </div>
      </div>
    </section>
  );
}
