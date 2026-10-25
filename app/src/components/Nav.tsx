import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { profile } from "../data/content";
import { cn } from "../lib/cn";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#founder", label: "Founder" },
  { href: "#experience", label: "Experience" },
  { href: "#terminal", label: "Terminal" },
  { href: "#life", label: "Life" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div className="h-[2px] origin-left bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-emerald" style={{ scaleX: progress }} />
      <nav
        className={cn(
          "mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 sm:px-5",
          scrolled ? "glass mx-3 sm:mx-auto" : "border border-transparent",
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan via-neon-indigo to-neon-emerald font-mono text-xs font-bold text-ink">VK</span>
          <span className="hidden text-sm font-medium text-white sm:block">Vamshi Korutla</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 px-3.5 py-1.5 text-sm font-medium text-neon-cyan transition hover:bg-neon-cyan/20 sm:flex"
          >
            <FileText size={15} /> Résumé
          </a>
          <button className="rounded-lg p-2 text-slate-300 md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-3 mt-2 flex flex-col rounded-2xl p-2 md:hidden"
          >
            {[...LINKS, { href: profile.resume, label: "Résumé (PDF)" }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-slate-200 hover:bg-white/5">
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
