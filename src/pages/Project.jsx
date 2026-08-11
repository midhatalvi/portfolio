import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projects, getProject } from "../data/projects.js";
import RichText from "../components/RichText.jsx";

export default function Project() {
  const { slug } = useParams();
  const p = getProject(slug);

  if (!p) {
    return (
      <main>
        <section className="dhero">
          <div className="wrap">
            <Link to="/#work" className="detail-back">
              ← All work
            </Link>
            <h1 className="detail-title">Project not found</h1>
            <div className="detail-cap">That project doesn&apos;t exist.</div>
          </div>
        </section>
      </main>
    );
  }

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main>
      <section className="dhero">
        <motion.div
          className="wrap"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link to="/#work" className="detail-back">
            ← All work
          </Link>
          <div className="detail-eyebrow">
            {p.eyebrow} · {p.org}
          </div>
          <h1 className="detail-title">{p.title}</h1>
          <div className="detail-num">
            {p.headline}
            <u>{p.unit}</u>
          </div>
          <div className="detail-cap">{p.cap}</div>
        </motion.div>
      </section>

      <div className="wrap">
        <div className="detail-body">
          <div className="detail-main">
            {p.sections.map((s, i) => (
              <motion.div
                className="detail-section"
                key={s.h}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <h2>{s.h}</h2>
                <p>
                  <RichText text={s.p} />
                </p>
              </motion.div>
            ))}
          </div>

          <aside className="detail-aside">
            <div className="spec-card">
              <h3>Key specifications</h3>
              <table className="specs">
                <tbody>
                  {p.specs.map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {p.links && p.links.length > 0 && (
              <div className="aside-links">
                {p.links.map(([label, href]) => (
                  <a key={label} href={href}>
                    {label} →
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>

        <figure
          className={`detail-gallery${
            (p.gallery && p.gallery.length ? p.gallery.length : 1) <= 2
              ? " detail-gallery--wide"
              : ""
          }`}
        >
          {(p.gallery && p.gallery.length ? p.gallery : [p.image]).map((src, i) => (
            <img key={src} src={src} alt={`${p.title} — view ${i + 1}`} />
          ))}
        </figure>

        <div className="detail-next">
          <Link to={`/work/${next.slug}`}>
            Next project: {next.title} →
          </Link>
        </div>
      </div>
    </main>
  );
}
