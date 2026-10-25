import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { ArrowDown, Check, Copy, FileText, Mail, Sparkles } from "lucide-react";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { lenses, profile, stats, type LensKey } from "../data/content";
import { TiltCard } from "./ui";
import { cn } from "../lib/cn";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const match = value.match(/^(~?)(\d+)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);
  useEffect(() => {
    if (!inView || !match) return;
    const [, pre, num, post] = match;
    const c = animate(0, Number(num), { duration: 1.6, ease: "easeOut", onUpdate: (v) => setDisplay(`${pre}${Math.round(v)}${post}`) });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  return <span ref={ref}>{display}</span>;
}

const FLOATERS = [
  { text: "SQL · Snowflake · Power BI", cls: "-left-10 top-10", delay: 0 },
  { text: "Founder · KOGOS ~45K", cls: "-right-8 top-1/3", delay: 0.8 },
  { text: "4 AI products shipped", cls: "-left-6 bottom-16", delay: 1.6 },
];

export default function Hero({ lens, setLens }: { lens: LensKey; setLens: (l: LensKey) => void }) {
  const L = lenses[lens];
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6">
      <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-slate-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-emerald opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-emerald" />
            </span>
            Open to full-time roles · US · Start immediately
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-2 font-mono text-sm text-slate-400">
            Hi, I'm
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-gradient text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl"
          >
            Vamshi Krishna
            <br />
            Korutla
          </motion.h1>

          <div className="mt-7">
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">Hiring for</p>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="View my profile for a role">
              {(Object.keys(lenses) as LensKey[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={lens === k}
                  onClick={() => setLens(k)}
                  className={cn("relative rounded-full px-3.5 py-1.5 text-sm transition", lens === k ? "text-ink" : "text-slate-300 hover:text-white")}
                >
                  {lens === k && (
                    <motion.span
                      layoutId="lens-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan to-neon-emerald"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative font-medium">{lenses[k].label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 min-h-[220px] sm:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div key={lens} initial={{ opacity: 0, y: 10, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(6px)" }} transition={{ duration: 0.35 }}>
                <h2 className="text-xl font-medium text-white sm:text-2xl">{L.headline}</h2>
                <p className="mt-3 max-w-xl leading-relaxed text-slate-400">{L.pitch}</p>
                <ul className="mt-4 space-y-2">
                  {L.proof.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check size={16} className="mt-0.5 shrink-0 text-neon-emerald" /> {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-neon-cyan">
              <Sparkles size={16} /> See my work
            </a>
            <a href={profile.resume} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white transition hover:border-neon-cyan/50">
              <FileText size={16} /> Résumé
            </a>
            <button onClick={copyEmail} className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-slate-300 transition hover:text-white">
              {copied ? <Check size={16} className="text-neon-emerald" /> : <Mail size={16} />}
              <span className="font-mono text-xs">{copied ? "Copied!" : profile.email}</span>
              {!copied && <Copy size={13} className="opacity-50" />}
            </button>
            <div className="flex gap-1">
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <LinkedInLogoIcon width={18} height={18} />
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <GitHubLogoIcon width={18} height={18} />
              </a>
              <a href={profile.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-lg p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white">
                <InstagramLogoIcon width={18} height={18} />
              </a>
            </div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-[360px]">
          <div aria-hidden className="absolute -inset-4 rounded-full sm:-inset-10 bg-gradient-to-tr from-neon-cyan/25 via-neon-indigo/25 to-neon-emerald/20 blur-3xl" />
          <div aria-hidden className="absolute -inset-2 animate-[spin_22s_linear_infinite] sm:-inset-5 rounded-[2.5rem] border border-dashed border-neon-cyan/20" />
          <TiltCard className="rounded-[2rem]">
            <div className="glass overflow-hidden rounded-[2rem] p-2">
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <img src="/img/headshot.webp" alt="Vamshi Krishna Korutla" width={880} height={1100} className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 pt-16">
                  <p className="text-sm font-medium text-white">Analyst · Founder · Builder</p>
                  <p className="font-mono text-[11px] text-slate-400">M.S. Data Analytics, Northeastern</p>
                </div>
              </div>
            </div>
          </TiltCard>
          {FLOATERS.map((f) => (
            <motion.div
              key={f.text}
              className={cn("glass absolute hidden whitespace-nowrap rounded-xl px-3 py-1.5 font-mono text-[11px] text-slate-200 sm:block", f.cls)}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: f.delay, ease: "easeInOut" }}
              style={{ transform: "translateZ(60px)" }}
            >
              {f.text}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.08 }}
            className="glass rounded-2xl p-4"
          >
            <div className="text-3xl font-semibold tracking-tight text-white">
              <CountUp value={s.value} />
            </div>
            <div className="mt-1 text-xs leading-snug text-slate-400">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <a href="#marquee" className="mx-auto mt-10 flex flex-col items-center gap-1 text-xs text-slate-500 transition hover:text-slate-300" aria-label="Scroll down">
        <span className="font-mono">scroll</span>
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.span>
      </a>
    </section>
  );
}
