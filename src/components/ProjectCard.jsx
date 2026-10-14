import { Link } from "react-router-dom";

export default function ProjectCard({ p }) {
  return (
    <Link to={`/work/${p.slug}`} className="tile projlink">
      <div className="tile-head">
        <span>{p.eyebrow}</span>
      </div>
      <div className="tile-img">
        <img
          src={p.image}
          alt={p.title}
          style={p.imgPos ? { objectPosition: p.imgPos } : undefined}
        />
      </div>
      <div className="tile-body">
        <h3 className="p-title">{p.title}</h3>
        {p.cap && <p className="tile-cap">{p.cap}</p>}
        <div className="tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <span className="viewmore">View details</span>
      </div>
    </Link>
  );
}
