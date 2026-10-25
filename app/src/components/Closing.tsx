import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, Mail, MapPin, X } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { gallery, profile } from "../data/content";
import { Reveal, SectionHeader, TiltCard } from "./ui";

export function Gallery() {
  const [zoom, setZoom] = useState<number | null>(null);
  return (
    <section id="life" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="06 · Beyond the dashboard"
        title={
          <>
            From India to <span className="text-gradient">Portland, Boston & SF.</span>
          </>
        }
        sub="A few moments from the journey: graduating from Northeastern, the Roux Institute campus, and the community I built along the way."
      />
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {gallery.map((g, i) => (
          <Reveal key={g.src} delay={i * 0.05}>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => setZoom(i)} className="group relative block w-full overflow-hidden rounded-2xl border border-white/10">
              <img src={g.src} alt={g.caption} width={g.w} height={g.h} loading="lazy" className="w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 pt-10 text-left text-xs text-slate-200 opacity-90 transition group-hover:opacity-100">{g.caption}</div>
            </motion.button>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {zoom !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-lg" onClick={() => setZoom(null)}>
            <button className="absolute right-5 top-5 rounded-full p-2 text-slate-300 hover:bg-white/10" aria-label="Close">
              <X />
            </button>
            <motion.figure initial={{ scale: 0.94 }} animate={{ scale: 1 }} exit={{ scale: 0.94 }} className="max-h-[85vh] max-w-3xl">
              <img src={gallery[zoom].src} alt={gallery[zoom].caption} className="max-h-[78vh] rounded-2xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-slate-300">{gallery[zoom].caption}</figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-neon-cyan/20 blur-3xl" />
          <div aria-hidden className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-neon-emerald/15 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow mb-3">07 · Let's talk</p>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Have a role where data, product or operations <span className="text-gradient">need an owner?</span>
              </h2>
              <p className="mt-4 max-w-lg text-slate-400">
                I'm looking for full-time roles in analytics, product, strategy & operations, customer success and business development. I can start immediately and reply within a day.
              </p>
              <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                <MapPin size={15} className="text-neon-cyan" /> Dallas · New York · Boston · San Francisco · Portland ME · open to relocation
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`mailto:${profile.email}?subject=Opportunity%20for%20Vamshi`} className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:bg-neon-cyan">
                  <Mail size={16} /> {profile.email}
                </a>
                <a href={profile.resume} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm text-white">
                  <FileText size={16} /> Download résumé
                </a>
              </div>
              <div className="mt-4 flex gap-4 text-sm">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white">
                  <LinkedInLogoIcon /> LinkedIn <ArrowUpRight size={13} />
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white">
                  <GitHubLogoIcon /> GitHub <ArrowUpRight size={13} />
                </a>
              </div>
            </div>
            <TiltCard className="mx-auto w-full max-w-[280px] rounded-3xl">
              <div className="glass overflow-hidden rounded-3xl p-2">
                <img src="/img/portrait.webp" alt="Vamshi Krishna Korutla" width={800} height={1000} loading="lazy" className="aspect-[4/5] w-full rounded-[1.25rem] object-cover" />
              </div>
            </TiltCard>
          </div>
        </div>
      </Reveal>
      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Vamshi Krishna Korutla</span>
        <span className="font-mono">Built with React · Three.js · Framer Motion · Tailwind</span>
      </footer>
    </section>
  );
}
