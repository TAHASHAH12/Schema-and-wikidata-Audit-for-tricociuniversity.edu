import WldmLogo from "./WldmLogo";

const LINKS = [
  { id: "overview", label: "Overview" },
  { id: "defects", label: "What is broken" },
  { id: "coverage", label: "Markup by page type" },
  { id: "campuses", label: "The campus problem" },
  { id: "courses", label: "Course rich results" },
  { id: "entities", label: "Entity layer" },
  { id: "verification", label: "Verification gate" },
  { id: "competitors", label: "Competitors" },
  { id: "serp", label: "What earns rich results" },
  { id: "roadmap", label: "Roadmap" },
];

export default function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className="container">
        <div className="brandhead">
          <a href="https://wldm.io" target="_blank" rel="noreferrer" aria-label="WLDM">
            <WldmLogo height={32} />
          </a>
          <div className="brandtag">
            Schema &amp; Wikidata audit &middot; tricociuniversity.edu
            <br />
            September 2026
          </div>
        </div>
      </div>
      <nav className="navchips" aria-label="Section navigation">
        <div className="container row">
          {LINKS.map((l) => (
            <button key={l.id} className="navchip" onClick={() => scrollTo(l.id)}>
              {l.label}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
