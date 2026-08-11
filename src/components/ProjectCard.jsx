import { Link } from "react-router-dom";

export default function ProjectCard({ p }) {
  return (
    <Link to={`/work/${p.slug}`} className="tile projlink">
      <div className="tile-img">
        <img src={p.image} alt={p.title} />
      </div>
      <div className="tile-body">
        <div className="p-id">{p.eyebrow}</div>
        <h3 className="p-title">{p.title}</h3>
        <div className="tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <span className="viewmore">View details →</span>
      </div>
    </Link>
  );
}
