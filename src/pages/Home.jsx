import Reveal from "../components/Reveal.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import HeroField from "../components/HeroField.jsx";
import { projects } from "../data/projects.js";

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="hero">
        <HeroField />
        <div className="wrap">
          <div>
            <h1 className="hero-name">
              Midhat<em>Alvi</em>
            </h1>
            <p className="hero-lede">
              I design mechanisms that move, and I make the{" "}
              <b>electronics and controls</b> behind them actually work.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SCAN STRIP ===== */}
      <section className="scan">
        <div className="wrap">
          <div className="scan-cell">
            <h3>What I do</h3>
            <p>
              Mechanical design, plus the embedded controls and testing that
              turn a CAD model into hardware that runs.
            </p>
          </div>
          <div className="scan-cell">
            <h3>What I&apos;m good at</h3>
            <p>
              Owning a subsystem from a rough sketch to a fabricated, wired, and
              tested assembly.
            </p>
          </div>
          <div className="scan-cell">
            <h3>What I&apos;m into</h3>
            <p>
              Robotics and aerospace. Anything where the part has to survive the
              real world.
            </p>
          </div>
        </div>
      </section>

      {/* ===== WORK ===== */}
      <section id="work">
        <div className="wrap">
          <Reveal className="dim">
            <span className="tick" />
            <span className="line" />
            <span className="label">01 — Selected Work</span>
            <span className="line" />
            <span className="tick" />
          </Reveal>
          <Reveal>
            <h2>Projects.</h2>
          </Reveal>
          <Reveal>
            <p className="h2-sub">
              Click any tile for the full story and specs.
            </p>
          </Reveal>

          <div className="proj-grid">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04}>
                <ProjectCard p={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CAPABILITIES ===== */}
      <section id="capabilities">
        <div className="wrap">
          <Reveal className="dim">
            <span className="tick" />
            <span className="line" />
            <span className="label">02 — Capabilities</span>
            <span className="line" />
            <span className="tick" />
          </Reveal>
          <Reveal>
            <div className="caps">
              <div className="cap">
                <h3>Mechanical Design</h3>
                <ul>
                  <li>SolidWorks, Fusion 360</li>
                  <li>3D printing &amp; fixturing</li>
                  <li>Brackets &amp; structural assemblies</li>
                  <li>DFM &amp; serviceability</li>
                </ul>
              </div>
              <div className="cap">
                <h3>Analysis &amp; Simulation</h3>
                <ul>
                  <li>Ansys (FEA)</li>
                  <li>Thermal: TMT, film temp, ΔP</li>
                  <li>API 530 / 560</li>
                  <li>ASME Section I &amp; VIII</li>
                </ul>
              </div>
              <div className="cap">
                <h3>Robotics &amp; Controls</h3>
                <ul>
                  <li>RoboClaw motor controllers</li>
                  <li>Arduino, sensors, power dist.</li>
                  <li>Wiring, soldering, harness fab</li>
                  <li>Simulink</li>
                </ul>
              </div>
              <div className="cap">
                <h3>Aerospace &amp; Code</h3>
                <ul>
                  <li>Propulsion &amp; combustion</li>
                  <li>Aerodynamics (Matlab)</li>
                  <li>Carbon fiber wet layup</li>
                  <li>Python, VBA</li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="contact">
        <div className="wrap">
          <h2>Building something that has to survive the real world?</h2>
          <p>
            That is the part I like most. If you are working on robotics,
            propulsion, or anything mechanical that needs to actually run, I
            would love to hear about it.
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
