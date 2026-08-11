import { Link } from "react-router-dom";

export default function TopBar() {
  return (
    <header className="topbar">
      <div className="wrap">
        <Link to="/" className="mark">
          Midhat Alvi<span className="dot">.</span>
        </Link>
        <nav className="nav">
          <Link to="/#work">Work</Link>
          <Link to="/#capabilities">Capabilities</Link>
          <Link to="/#contact" className="keep">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
