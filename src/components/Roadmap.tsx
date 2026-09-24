const PHASES = [
  {
    n: "01", title: "One block, this week", effort: "Under an hour",
    items: [
      "Add ItemList markup to /programs/ referencing the five existing Course URLs.",
      "Remove the Product type from the ten campus and programme pages carrying it.",
      "Move the aggregateRating from the Product node onto the school for that campus.",
    ],
    why: "Makes five already-valid Course pages eligible for a carousel, and removes the only markup on the site that is actively wrong.",
  },
  {
    n: "02", title: "Give every campus a place", effort: "One sprint",
    items: [
      "Emit a School node per campus with its own address, geo, telephone and opening hours.",
      "Link each to the university with parentOrganization, and the university back with subOrganization.",
      "Add areaServed for the city and surrounding towns each campus recruits from.",
      "Attach each campus's Wikidata city entity with sameAs.",
    ],
    why: "68 campus pages currently claim a single Park Ridge address. This is the finding with the most traffic behind it.",
  },
  {
    n: "03", title: "Describe the programmes properly", effort: "One sprint",
    items: [
      "Type the 15 programme sub-pages as parts of their parent Course, not Articles.",
      "Add Occupation markup to the four career-path pages, with occupationalCategory and a Wikidata sameAs.",
      "Add occupationalCredentialAwarded to each programme, naming the state licence.",
      "Type the clinic pages as HealthAndBeautyBusiness with a Service and Offer per treatment.",
    ],
    why: "Connects a programme to the licence it awards and the job it leads to — the entity chain that matters in vocational education, and which no competitor has built.",
  },
  {
    n: "04", title: "Entity layer", effort: "Ongoing",
    items: [
      "Attach the verified Wikidata identifiers from this audit across the page types.",
      "Enrich the university's own Wikidata item, which exists but is thin.",
      "Add VideoObject to tours and student work.",
      "Re-verify every identifier before each publish; items get merged and deleted.",
    ],
    why: "Makes the site legible to AI answer engines, which read entity relationships rather than keywords.",
  },
];

export default function Roadmap() {
  return (
    <section className="section" id="roadmap">
      <div className="container">
        <div className="eyebrow">Roadmap</div>
        <h2>In the order that pays back fastest</h2>
        <p className="lead">
          Sequenced by return rather than by effort. Phase 01 is an hour of work against markup that
          already exists and is already valid.
        </p>

        <div
          className="responsive-grid"
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
            gap: 16, marginTop: 26,
          }}
        >
          {PHASES.map((p) => (
            <div className="card" key={p.n}>
              <div
                style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: 10,
                }}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: 22, fontWeight: 600, color: "var(--ink-mute)" }}>
                  {p.n}
                </span>
                <span className="classchip">{p.effort}</span>
              </div>
              <h3>{p.title}</h3>
              <ul className="clean" style={{ fontSize: 13.5 }}>
                {p.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 0, marginTop: 10 }}>
                {p.why}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
