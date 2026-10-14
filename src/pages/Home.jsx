import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";

export default function Home() {
  return (
    <main>
      {/* ===== HERO SHEET ===== */}
      <section className="sheet">
        <div className="sheet-top">
          <span><b>Midhat Alvi</b></span>
          <span className="r">Mechanical · Robotics · Aerospace</span>
        </div>
        <div className="hero">
          <h1 className="hero-name">
            Midhat<em>Alvi</em>
          </h1>
          <p className="hero-lede">
            I design mechanisms that move, and I make the{" "}
            <b>electronics and controls</b> behind them actually work.
          </p>
          <div className="dimrule">
            <span className="t" />
            <span className="l" />
            <span className="t" />
          </div>
        </div>
      </section>

      {/* ===== WORK (grid of project sheets) ===== */}
      <section id="work" className="work">
        <div className="wrap">
          <div className="work-head">
            <span className="h">Selected work</span>
            <span className="r">{projects.length} projects</span>
          </div>
          <div className="proj-grid">
            {projects.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT SHEET ===== */}
      <section id="contact" className="sheet contact">
        <div className="sheet-top">
          <span><b>Contact</b></span>
          <span className="r">South Brunswick, NJ</span>
        </div>
        <div className="sheet-body">
          <p className="contact-line">
            I like hardware that has to survive the real world. Tell me what
            you are building.
          </p>
          <div className="contact-links">
            <a href="mailto:midhatalvi02@gmail.com">midhatalvi02@gmail.com</a>
            <a href="https://www.linkedin.com/in/midhatalvi/">LinkedIn</a>
            <a href="https://github.com/midhatalvi">GitHub</a>
            <a href="/resume.pdf">Résumé (PDF)</a>
          </div>
        </div>
      </section>
    </main>
  );
}
