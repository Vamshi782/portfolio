import { lazy, Suspense, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Bento, { Marquee } from "./components/Bento";
import Projects from "./components/Projects";
import { Experience, Founder } from "./components/Founder";
import Terminal from "./components/Terminal";
import { Contact, Gallery } from "./components/Closing";
import { useMediaQuery } from "./hooks/useMediaQuery";
import type { LensKey } from "./data/content";

const NetworkCanvas = lazy(() => import("./components/NetworkCanvas"));

export default function App() {
  const [lens, setLens] = useState<LensKey>("data");
  const mobile = useMediaQuery("(max-width: 1023px)");
  const reduced = !!useReducedMotion();
  const { scrollY } = useScroll();
  const canvasOpacity = useTransform(scrollY, [0, 900], mobile ? [0.5, 0.2] : [1, 0.28]);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(ellipse_60%_50%_at_0%_100%,rgba(16,185,129,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <motion.div className="absolute inset-0" style={{ opacity: canvasOpacity }}>
          <Suspense fallback={null}>
            <NetworkCanvas mobile={mobile} reduced={reduced} />
          </Suspense>
        </motion.div>
        <div className="noise absolute inset-0 opacity-[0.035] mix-blend-overlay" />
      </div>

      <Nav />
      <main className="relative overflow-x-clip">
        <Hero lens={lens} setLens={setLens} />
        <Marquee />
        <Bento />
        <Projects lens={lens} />
        <Founder />
        <Experience />
        <Terminal />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
