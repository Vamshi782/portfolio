import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink, ScrollText, X } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-python";
import { lenses, moreBuilds, projects, type LensKey, type Project } from "../data/content";
import { Chip, Pill, Reveal, SectionHeader, SpotlightCard } from "./ui";
import { cn } from "../lib/cn";

const STATUS_ACCENT: Record<Project["status"], "emerald" | "amber" | "indigo" | "cyan"> = {
  Live: "emerald",
  "Private beta": "cyan",
  "In development": "amber",
  "Case study": "indigo",
  "Open source": "cyan",
};

const GLOW: Record<Project["accent"], string> = {
  cyan: "from-neon-cyan/30",
  indigo: "from-neon-indigo/30",
  emerald: "from-neon-emerald/30",
  amber: "from-neon-amber/30",
  pink: "from-neon-pink/30",
};

const TABS = [
  { id: "overview", label: "Overview", icon: ScrollText },
  { id: "stack", label: "Tech Stack", icon: Code2 },
  { id: "log", label: "Build Log", icon: ArrowUpRight },
] as const;

export default function Projects({ lens }: { lens: LensKey }) {
  const [open, setOpen] = useState<string | null>(null);
  const featured = lenses[lens].projects;
  const ordered = useMemo(
    () => [...projects].sort((a, b) => (featured.indexOf(a.id) === -1 ? 99 : featured.indexOf(a.id)) - (featured.indexOf(b.id) === -1 ? 99 : featured.indexOf(b.id))),
    [featured],
  );
  const active = projects.find((p) => p.id === open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="work" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="02 · Things I've built"
        title={
          <>
            Products I've shipped <span className="text-gradient">and things I've built.</span>
          </>
        }
        sub={`Sorted for the ${lenses[lens].label} lens you picked above. Click any card for the overview, stack and build log.`}
      />

      <LayoutGroup>
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((p, i) => (
            <motion.div layout key={p.id} transition={{ type: "spring", stiffness: 260, damping: 30 }} className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}>
              <Reveal delay={i * 0.04} className="h-full">
                <motion.button layoutId={`card-${p.id}`} onClick={() => setOpen(p.id)} className="block h-full w-full text-left">
                  <SpotlightCard className="relative h-full overflow-hidden p-6">
                    <div aria-hidden className={cn("absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br to-transparent blur-2xl", GLOW[p.accent])} />
                    {featured.includes(p.id) && (
                      <span className="absolute right-4 top-4 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white">★ fits {lenses[lens].label}</span>
                    )}
                    <Pill accent={STATUS_ACCENT[p.status]}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" /> {p.status}
                    </Pill>
                    <motion.h3 layoutId={`title-${p.id}`} className="mt-4 text-xl font-semibold text-white">
                      {p.name}
                    </motion.h3>
                    <p className="mt-0.5 font-mono text-[11px] text-slate-500">{p.kind}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.blurb}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 3).map((s) => (
                        <Chip key={s}>{s}</Chip>
                      ))}
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm text-neon-cyan">
                      Open case <ArrowUpRight size={14} />
                    </span>
                  </SpotlightCard>
                </motion.button>
              </Reveal>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {active && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-md"
                onClick={() => setOpen(null)}
              />
              <div className="pointer-events-none fixed inset-0 z-[61] grid place-items-center p-3 sm:p-6">
                <motion.div layoutId={`card-${active.id}`} className="glass pointer-events-auto relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-ink-900/90 p-6 sm:p-8" role="dialog" aria-modal="true" aria-label={active.name}>
                  <ProjectDetail p={active} onClose={() => setOpen(null)} />
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </LayoutGroup>

      <Reveal className="mt-10">
        <div className="glass rounded-3xl p-6">
          <p className="eyebrow mb-4">More builds</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {moreBuilds.map((b) => (
              <a key={b.name} href={b.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/5 p-4 transition hover:border-neon-cyan/30 hover:bg-white/[0.03]">
                <div className="flex items-center justify-between text-sm font-medium text-white">
                  {b.name} <ArrowUpRight size={14} className="text-slate-500 transition group-hover:text-neon-cyan" />
                </div>
                <p className="mt-1 text-xs text-slate-400">{b.note}</p>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ProjectDetail({ p, onClose }: { p: Project; onClose: () => void }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");
  const code = p.code ? Prism.highlight(p.code.src, Prism.languages[p.code.lang] ?? Prism.languages.sql, p.code.lang) : null;

  return (
    <>
      <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white" aria-label="Close">
        <X size={18} />
      </button>
      <Pill accent={STATUS_ACCENT[p.status]}>{p.status}</Pill>
      <motion.h3 layoutId={`title-${p.id}`} className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
        {p.name}
      </motion.h3>
      <p className="mt-1 font-mono text-xs text-slate-500">{p.kind}</p>

      <div className="mt-6 flex gap-1 rounded-xl border border-white/10 bg-black/30 p-1">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} className={cn("relative flex-1 rounded-lg px-3 py-2 text-sm transition", tab === t.id ? "text-white" : "text-slate-400 hover:text-slate-200")}>
            {tab === t.id && <motion.span layoutId={`tab-${p.id}`} className="absolute inset-0 rounded-lg bg-white/10" />}
            <span className="relative inline-flex items-center gap-1.5">
              <t.icon size={14} /> {t.label}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-5 min-h-[180px]">
          {tab === "overview" && (
            <ul className="space-y-3">
              {p.overview.map((o) => (
                <li key={o} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-cyan" /> {o}
                </li>
              ))}
            </ul>
          )}
          {tab === "stack" && (
            <div>
              <div className="flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
              {code && (
                <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/5 bg-black/50 p-4">
                  <code dangerouslySetInnerHTML={{ __html: code }} />
                </pre>
              )}
            </div>
          )}
          {tab === "log" && (
            <div className="rounded-2xl border border-white/5 bg-black/50 p-4 font-mono text-xs leading-7">
              {p.log.map((l, i) => (
                <motion.div key={l} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }} className="text-slate-300">
                  <span className="text-neon-emerald">✓</span> <span className="text-slate-500">{String(i + 1).padStart(2, "0")}</span> {l}
                </motion.div>
              ))}
              <div className="text-slate-500">
                <span className="animate-blink">▍</span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex flex-wrap gap-2">
        {p.link && (
          <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-neon-cyan">
            Visit live <ExternalLink size={14} />
          </a>
        )}
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white">
            <GitHubLogoIcon /> Source
          </a>
        )}
        {!p.link && !p.repo && <span className="text-xs text-slate-500">Private repository · demo available on request</span>}
      </div>
    </>
  );
}
