import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Handshake, Mail, MapPin } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { profile } from "../data/content";
import { Reveal, TiltCard } from "./ui";

const TENSES = [
  { word: "Explored.", cls: "text-slate-500" },
  { word: "Exploring.", cls: "text-white" },
  { word: "Will keep exploring.", cls: "text-gradient" },
];

// Three tenses reveal one after another, then the chill one-liner.
export function Motto() {
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
      <div aria-hidden className="absolute left-1/2 top-1/2 h-72 w-[min(90%,44rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-indigo/15 blur-3xl" />
      <div className="relative space-y-1 sm:space-y-2">
        {TENSES.map((t, i) => (
          <motion.p
            key={t.word}
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl ${t.cls}`}
          >
            {t.word}
          </motion.p>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative mx-auto mt-8 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
      >
        Life's short, so I spend it building things that move people forward, and hunting down the best chai spot in every new city <span aria-hidden>☕</span>
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.6 }}
        className="relative mt-4 font-mono text-xs uppercase tracking-[0.3em] text-slate-500"
      >
        — Vamshi
      </motion.p>
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
                  <LinkedInLogoIcon /> LinkedIn · 8K+ <ArrowUpRight size={13} />
                </a>
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white">
                  <GitHubLogoIcon /> GitHub <ArrowUpRight size={13} />
                </a>
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white">
                  <InstagramLogoIcon /> Instagram <ArrowUpRight size={13} />
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
      <Reveal delay={0.1}>
        <div className="glass relative mt-4 flex flex-col gap-5 overflow-hidden rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div aria-hidden className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-neon-pink/15 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-neon-pink/30 bg-neon-pink/10 text-neon-pink">
              <Handshake size={20} />
            </span>
            <div>
              <p className="eyebrow !text-neon-pink/80">Community, creators & collabs</p>
              <h3 className="mt-1 text-lg font-medium text-white">Want to build something together, or just exploring life, jobs, careers and learning?</h3>
              <p className="mt-1 max-w-xl text-sm text-slate-400">
                Just send me a hi and I'll walk with you, buddy. Brand partnerships and story features welcome too. Hiring? Use {profile.email} above.
              </p>
            </div>
          </div>
          <div className="relative flex shrink-0 flex-wrap gap-2">
            <motion.a
              href={profile.instagram}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-pink to-neon-amber px-4 py-2.5 text-sm font-semibold text-ink"
            >
              <motion.span aria-hidden animate={{ rotate: [0, 18, -8, 18, 0] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.8 }} className="inline-block origin-[70%_70%]">
                👋
              </motion.span>
              Say hi on Instagram
            </motion.a>
            <a href={`mailto:${profile.collabEmail}?subject=Hi%20Vamshi`} className="inline-flex items-center gap-2 rounded-xl border border-neon-pink/40 bg-neon-pink/10 px-4 py-2.5 text-sm font-medium text-neon-pink transition hover:bg-neon-pink/20">
              <Mail size={15} /> {profile.collabEmail}
            </a>
          </div>
        </div>
      </Reveal>
      <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row">
        <span>© {new Date().getFullYear()} Vamshi Krishna Korutla</span>
        <span className="font-mono">Life is short. Build what matters.</span>
      </footer>
    </section>
  );
}
