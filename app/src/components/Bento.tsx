import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, BarChart3, Bot, GraduationCap, Layers, ShieldCheck, Target, Workflow } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-sql";
import { certifications, companies, education } from "../data/content";
import { Chip, Reveal, SectionHeader, SpotlightCard } from "./ui";

const IMPACT = [
  { name: "Reporting accessibility", where: "Cardinal Health project", v: 30 },
  { name: "Data inconsistencies ↓", where: "Cardinal Health project", v: 25 },
  { name: "Delivery timelines", where: "Cardinal Health project", v: 20 },
];
const BAR_COLORS = ["#22d3ee", "#38bdf8", "#818cf8", "#a78bfa", "#34d399", "#6ee7b7"];

const SQL = `-- reconcile source vs. report before leaders see it
SELECT r.region,
       SUM(s.amount)                 AS source_total,
       SUM(r.amount)                 AS report_total,
       SUM(s.amount) - SUM(r.amount) AS variance
FROM   warehouse.ops.source_txn s
JOIN   bi.exec_report r USING (txn_id)
GROUP  BY r.region
HAVING ABS(SUM(s.amount) - SUM(r.amount)) > 0;`;

function useStream() {
  const [data, setData] = useState(() =>
    Array.from({ length: 28 }, (_, i) => ({ t: i, rows: 60 + Math.sin(i / 3) * 18 + Math.random() * 10, flags: Math.random() * 8 })),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => {
        const last = d[d.length - 1].t + 1;
        return [...d.slice(1), { t: last, rows: 60 + Math.sin(last / 3) * 18 + Math.random() * 12, flags: Math.random() * 9 }];
      });
    }, 1100);
    return () => clearInterval(id);
  }, []);
  return data;
}

function ImpactTooltip({ active, payload }: { active?: boolean; payload?: { payload: (typeof IMPACT)[number] }[] }) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs">
      <div className="font-medium text-white">
        {p.name}: {p.v}%
      </div>
      <div className="text-slate-400">{p.where}</div>
    </div>
  );
}

const CAPS = [
  { icon: BarChart3, title: "Data & BI", items: ["SQL", "Azure", "Power BI", "Tableau", "Excel", "Python (working)", "Streamlit"] },
  { icon: Target, title: "Product & Analysis", items: ["User stories", "Acceptance criteria", "UAT", "BRD / FRD", "Process maps", "Jira", "Confluence"] },
  { icon: Workflow, title: "Strategy & Ops", items: ["Business cases", "ROI", "KPI design", "Root cause", "Exec reporting", "Automation"] },
  { icon: ShieldCheck, title: "AI Governance", items: ["NIST AI RMF", "ISO/IEC 42001", "EU AI Act", "Risk tiering", "Human oversight", "Audit evidence"] },
];

export default function Bento() {
  const stream = useStream();
  const latest = stream[stream.length - 1];
  const html = Prism.highlight(SQL, Prism.languages.sql, "sql");

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="01 · What I bring"
        title={
          <>
            Analyst rigor, <span className="text-gradient">founder speed.</span>
          </>
        }
        sub="Four years at Deloitte and hands-on projects since, making data trustworthy, plus the habit of shipping my own products. Every number below is from real work."
      />

      <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-4">
        <Reveal className="md:col-span-2 md:row-span-2">
          <SpotlightCard className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">Measured impact</p>
                <h3 className="mt-1 text-lg font-medium text-white">Improvements I delivered</h3>
              </div>
              <Activity className="text-neon-cyan" size={20} />
            </div>
            <div className="mt-4 min-h-[220px] flex-1">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={IMPACT} layout="vertical" margin={{ left: 0, right: 36, top: 4, bottom: 4 }}>
                  <XAxis type="number" domain={[0, 40]} hide />
                  <YAxis type="category" dataKey="name" width={128} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.03)" }} content={<ImpactTooltip />} />
                  <Bar dataKey="v" radius={[0, 8, 8, 0]} barSize={26} label={{ position: "right", fill: "#e2e8f0", fontSize: 12, formatter: (v: number) => `${v}%` }}>
                    {IMPACT.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-slate-500">Hover a bar for where it happened.</p>
          </SpotlightCard>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.05}>
          <SpotlightCard className="h-full p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon-emerald" /> Live demo
                </p>
                <h3 className="mt-1 text-lg font-medium text-white">Data-quality monitor</h3>
                <p className="text-xs text-slate-500">Simulated stream · the kind of KPI view I build</p>
              </div>
              <div className="text-right font-mono">
                <div className="text-xl text-neon-cyan">{latest.rows.toFixed(0)}k</div>
                <div className="text-[10px] text-slate-500">rows validated / min</div>
                <div className="mt-1 text-sm text-neon-amber">{latest.flags.toFixed(0)} flags</div>
              </div>
            </div>
            <div className="mt-3 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stream} margin={{ left: 0, right: 0, top: 6, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gRows" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gFlags" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="#fbbf24" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="rows" stroke="#22d3ee" strokeWidth={2} fill="url(#gRows)" isAnimationActive={false} />
                  <Area type="monotone" dataKey="flags" stroke="#fbbf24" strokeWidth={1.5} fill="url(#gFlags)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </SpotlightCard>
        </Reveal>

        {CAPS.slice(0, 2).map((c, i) => (
          <Reveal key={c.title} delay={0.08 + i * 0.04}>
            <CapCard {...c} />
          </Reveal>
        ))}

        <Reveal className="md:col-span-2" delay={0.05}>
          <SpotlightCard className="h-full p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow">How I work</p>
                <h3 className="mt-1 text-lg font-medium text-white">Validate, reconcile, then visualize</h3>
              </div>
              <Layers className="text-neon-indigo" size={20} />
            </div>
            <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/5 bg-black/40 p-4">
              <code className="language-sql" dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
          </SpotlightCard>
        </Reveal>

        {CAPS.slice(2).map((c, i) => (
          <Reveal key={c.title} delay={0.08 + i * 0.04}>
            <CapCard {...c} />
          </Reveal>
        ))}

        <Reveal className="md:col-span-2" delay={0.05}>
          <SpotlightCard className="h-full p-6">
            <div className="flex items-center justify-between">
              <p className="eyebrow">AI-native, human-reviewed</p>
              <Bot className="text-neon-emerald" size={20} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              I use Claude, ChatGPT and Microsoft Copilot every day for analysis, documentation and prototyping, and I've built two products on top of them. The rule
              never changes: a person reviews what the model produces before anyone relies on it.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Claude", "ChatGPT", "Copilot", "Gemini", "Prompt design", "Evaluation"].map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.1}>
          <SpotlightCard className="h-full p-6">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Education & certifications</p>
              <GraduationCap className="text-neon-cyan" size={20} />
            </div>
            <div className="mt-3 space-y-2">
              {education.map((e) => (
                <div key={e.school} className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-medium text-white">{e.degree}</span>
                  <span className="text-sm text-slate-400">{e.school}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1.5 border-t border-white/5 pt-4">
              {certifications.map((c) => (
                <p key={c} className="text-sm text-slate-300">
                  ✦ {c}
                </p>
              ))}
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}

function CapCard({ icon: Icon, title, items }: { icon: typeof BarChart3; title: string; items: string[] }) {
  return (
    <SpotlightCard className="h-full p-5">
      <Icon className="text-neon-cyan" size={20} />
      <h3 className="mt-3 font-medium text-white">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {items.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </SpotlightCard>
  );
}

export function Marquee() {
  const row = [...companies, ...companies];
  return (
    <div id="marquee" className="relative overflow-hidden border-y border-white/5 bg-white/[0.015] py-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <p className="mb-4 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-slate-500">Where I've worked, studied & built</p>
      <div className="flex w-max animate-marquee gap-14">
        {row.map((c, i) => (
          <span key={i} className="whitespace-nowrap text-xl font-semibold tracking-tight text-slate-500/80 transition hover:text-white sm:text-2xl">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
