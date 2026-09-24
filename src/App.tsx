import Header from "./components/Header";
import Hero from "./components/Hero";
import Defects from "./components/Defects";
import Coverage from "./components/Coverage";
import Campuses from "./components/Campuses";
import Courses from "./components/Courses";
import EntityLayer from "./components/EntityLayer";
import VerificationGate from "./components/VerificationGate";
import Competitors from "./components/Competitors";
import RichResults from "./components/RichResults";
import Roadmap from "./components/Roadmap";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <Header />
      <Hero />
      <Defects />
      <Coverage />
      <Campuses />
      <Courses />
      <EntityLayer />
      <VerificationGate />
      <Competitors />
      <RichResults />
      <Roadmap />
      <Footer />
    </div>
  );
}
