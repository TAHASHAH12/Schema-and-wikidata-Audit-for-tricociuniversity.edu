export default function Footer() {
  return (
    <footer className="section" style={{ paddingBottom: 60 }}>
      <div className="container">
        <div className="eyebrow">Method &amp; provenance</div>
        <h2>How these numbers were produced</h2>
        <ul className="clean" style={{ marginTop: 14 }}>
          <li>
            Page set: every indexable URL in the site&rsquo;s own sitemaps, crawled in full. Nothing
            here is sampled.
          </li>
          <li>
            Existing markup: every JSON-LD block on every page was parsed and typed, so the coverage
            figures describe the live site rather than a template.
          </li>
          <li>
            Traffic and keyword data: DataForSEO, United States, September 2026. Competitor markup was
            read directly from their live pages.
          </li>
          <li>
            Every Wikidata identifier was resolved against the live Wikidata API and screened on its
            label, description and class membership. No identifier in this report came from a language
            model.
          </li>
          <li>
            Google requirements were checked against the current developer documentation on the day of
            the audit, not recalled from memory.
          </li>
        </ul>
        <p style={{ marginTop: 22, fontFamily: "var(--mono)", fontSize: 11.5, color: "var(--muted)" }}>
          WLDM &middot; Schema &amp; Wikidata audit &middot; tricociuniversity.edu &middot; September 2026
        </p>
      </div>
    </footer>
  );
}
