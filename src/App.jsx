import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TopBar from "./components/TopBar.jsx";
import Footer from "./components/Footer.jsx";
import IntroGate from "./components/IntroGate.jsx";

export default function App() {
  const { pathname, hash } = useLocation();

  // On navigation: scroll to top, or to the hash target if present.
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <IntroGate />
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
}
