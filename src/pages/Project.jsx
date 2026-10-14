import { useParams, Link } from "react-router-dom";
import { projects, getProject } from "../data/projects.js";
import RichText from "../components/RichText.jsx";

export default function Project() {
  const { slug } = useParams();
  const p = getProject(slug);

  if (!p) {
    return (
      <main>
        <section className="sheet">
          <div className="sheet-top">
            <span><b>Midhat Alvi</b></span>
            <span className="r">Not found</span>
          </div>
          <div className="sheet-body">
            <Link to="/#work" className="detail-back">
              Back to work
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
  const gallery = p.gallery && p.gallery.length ? p.gallery : [p.image];

  return (
    <main>
      {/* ===== TITLE-BLOCK SHEET ===== */}
      <section className="sheet">
        <div className="sheet-top">
          <span><b>Midhat Alvi</b></span>
          <span className="r">{p.eyebrow}</span>
        </div>
        <div className="sheet-body dhero-body">
          <Link to="/#work" className="detail-back">
            Back to work
          </Link>
          <h1 className="detail-title">{p.title}</h1>
          <div className="detail-num">
            {p.headline}
            <u>{p.unit}</u>
          </div>
          <div className="detail-cap">{p.cap}</div>
        </div>
      </section>

      {/* ===== BODY (open on the paper; spec block is the one bordered element) ===== */}
      <section className="detail-main-sec">
        <div className="wrap">
          <div className="detail-body">
            <div className="detail-main">
              {p.sections.map((s) => (
                <div className="detail-section" key={s.h}>
                  <h2>{s.h}</h2>
                  {s.p && (
                    <p>
                      <RichText text={s.p} />
                    </p>
                  )}
                  {s.bullets && (
                    <ul className="detail-list">
                      {s.bullets.map((b, j) => (
                        <li key={j}>
                          <RichText text={b} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </aside>
          </div>

          <figure
            className={`detail-gallery${
              gallery.length <= 2 ? " detail-gallery--wide" : ""
            }`}
          >
            {gallery.map((src, i) => (
              <img key={src} src={src} alt={`${p.title}, view ${i + 1}`} />
            ))}
          </figure>
        </div>
      </section>

      <div className="wrap">
        <div className="detail-next">
          <Link to={`/work/${next.slug}`}>Next project: {next.title}</Link>
        </div>
      </div>
    </main>
  );
}
