import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Compass, Flame, HeartHandshake, Rocket, Users } from "lucide-react";
import { experience, journey, principles } from "../data/content";
import { Reveal, SectionHeader, SpotlightCard, TiltCard } from "./ui";

const PRINCIPLE_ICONS = [Compass, Rocket, Flame, HeartHandshake];

export function Founder() {
  return (
    <section id="founder" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="03 · Founder track"
        title={
          <>
            I build communities <span className="text-gradient">and the tools they need.</span>
          </>
        }
        sub="Outside my day job I run a career community and ship products for it. It keeps me close to real users and teaches me ownership no job title can."
      />

      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <TiltCard max={6} className="h-full rounded-3xl">
            <div className="glass relative h-full overflow-hidden rounded-3xl p-7">
              <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-neon-pink/20 blur-3xl" />
              <div aria-hidden className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-neon-indigo/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2">
                  <Users className="text-neon-pink" size={18} />
                  <p className="eyebrow !text-neon-pink/80">KOGOS · Founder</p>
                </div>
                <div className="mt-6 flex items-end gap-3">
                  <span className="text-7xl font-semibold tracking-tighter text-white sm:text-8xl">~45K</span>
                  <span className="mb-3 text-sm text-slate-400">people in the career community</span>
                </div>
                <p className="mt-4 max-w-md leading-relaxed text-slate-300">
                  Students and early-career professionals who share openings, interview prep and job-search wins. I started it to give people the honest guidance I wished I had when I moved to the US. Plus 8,000+ LinkedIn connections, and growing.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    ["Job leads", "shared daily"],
                    ["Interview prep", "and resume help"],
                    ["Product lab", "for my AI tools"],
                  ].map(([a, b]) => (
                    <div key={a} className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <div className="text-sm font-medium text-white">{a}</div>
                      <div className="text-[11px] text-slate-500">{b}</div>
                    </div>
                  ))}
                </div>
                <a href="https://kogos.co" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-1 text-sm text-neon-pink">
                  kogos.co <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => {
            const Icon = PRINCIPLE_ICONS[i];
            return (
              <Reveal key={p.title} delay={i * 0.06}>
                <SpotlightCard className="h-full p-5">
                  <Icon size={18} className="text-neon-emerald" />
                  <h3 className="mt-3 font-medium text-white">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.text}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Journey />
    </section>
  );
}

function Journey() {
  return (
    <div className="mt-16">
      <p className="eyebrow mb-6">The story so far</p>
      <div className="relative grid gap-4 md:grid-cols-5">
        <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-gradient-to-r from-neon-cyan/50 via-neon-indigo/50 to-neon-emerald/50 md:block" />
        {journey.map((j, i) => (
          <Reveal key={j.year} delay={i * 0.08}>
            <div className="relative">
              <div className="relative z-10 mb-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-ink font-mono text-[11px] text-neon-cyan shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                {j.year}
              </div>
              <h4 className="font-medium text-white">{j.title}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{j.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="04 · Experience"
        title={
          <>
            Five years inside <span className="text-gradient">healthcare & biotech.</span>
          </>
        }
        sub="Consulting, healthcare distribution and gene-therapy biotech: compliance-heavy places where the data has to be right."
      />
      <div ref={ref} className="relative pl-8 sm:pl-12">
        <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-white/10 sm:left-[19px]" />
        <motion.div aria-hidden style={{ height }} className="absolute left-[11px] top-0 w-px bg-gradient-to-b from-neon-cyan via-neon-indigo to-neon-emerald sm:left-[19px]" />
        <div className="space-y-6">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <div className="relative">
                <span aria-hidden className="absolute -left-8 top-7 h-3 w-3 -translate-x-[5px] rounded-full border-2 border-neon-cyan bg-ink sm:-left-12 sm:translate-x-[3px]" />
                <SpotlightCard className="p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{e.company}</h3>
                      <p className="text-sm text-neon-cyan">{e.role}</p>
                    </div>
                    <span className="font-mono text-xs text-slate-500">{e.dates}</span>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-500" /> {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span key={t} className="rounded-md bg-neon-indigo/10 px-2 py-0.5 font-mono text-[11px] text-neon-indigo">
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
