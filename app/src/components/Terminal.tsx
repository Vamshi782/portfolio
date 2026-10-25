import { useEffect, useRef, useState } from "react";
import { TerminalSquare } from "lucide-react";
import { certifications, education, experience, lenses, profile, projects } from "../data/content";
import { SectionHeader } from "./ui";

type Line = { kind: "in" | "out" | "accent" | "err"; text: string };

const HELP = [
  "Available commands:",
  "  about        who I am in 3 lines",
  "  projects     everything I've built",
  "  open <name>  open a live project (e.g. open insightforge)",
  "  experience   roles and dates",
  "  skills       tools I use",
  "  roles        roles I'm a fit for",
  "  education    degrees and certifications",
  "  contact      how to reach me",
  "  resume       download my résumé",
  "  clear        clear the screen",
];

function run(cmd: string): Line[] | "clear" {
  const [name, ...args] = cmd.trim().toLowerCase().split(/\s+/);
  const out = (t: string): Line => ({ kind: "out", text: t });
  const accent = (t: string): Line => ({ kind: "accent", text: t });
  switch (name) {
    case "":
      return [];
    case "help":
    case "?":
      return HELP.map(out);
    case "about":
    case "whoami":
      return [
        accent(profile.name),
        out("Data & business analyst with 5+ years at Deloitte, Cardinal Health and Solid Biosciences."),
        out("Founder of KOGOS (~45K career community) and builder of InsightForge AI and InsightApply AI."),
        out("M.S. Data Analytics, Northeastern University. Open to full-time roles across the US."),
      ];
    case "projects":
    case "ls":
      return projects.map((p) => out(`  ${p.id.padEnd(13)} ${p.status.padEnd(15)} ${p.name}`)).concat(out(""), out("Try: open insightforge"));
    case "open": {
      const p = projects.find((x) => x.id.startsWith(args[0] ?? "~"));
      if (!p) return [{ kind: "err", text: `No project "${args[0] ?? ""}". Type 'projects' to list them.` }];
      const url = p.link ?? p.repo;
      if (!url) return [out(`${p.name} is private. Ask me for a demo: ${profile.email}`)];
      window.open(url, "_blank", "noopener");
      return [accent(`Opening ${p.name} → ${url}`)];
    }
    case "experience":
      return experience.map((e) => out(`  ${e.dates.padEnd(20)} ${e.role}, ${e.company}`));
    case "skills":
      return [
        out("  data      SQL · Snowflake · Azure · Power BI · Tableau · Excel · Python (working) · Streamlit"),
        out("  product   user stories · acceptance criteria · UAT · Jira · Confluence · KPI design"),
        out("  ops       business cases · ROI · process mapping · root cause · exec reporting"),
        out("  ai        Claude · ChatGPT · Copilot · Gemini · NIST AI RMF · ISO/IEC 42001"),
      ];
    case "roles":
      return Object.values(lenses).map((l) => out(`  ✦ ${l.label.padEnd(18)} ${l.headline}`));
    case "education":
      return [...education.map((e) => out(`  ${e.degree}, ${e.school}`)), ...certifications.map((c) => out(`  ✦ ${c}`))];
    case "contact":
      return [out(`  email     ${profile.email}`), out(`  linkedin  ${profile.linkedin}`), out(`  github    ${profile.github}`)];
    case "resume":
    case "cv":
      window.open(profile.resume, "_blank", "noopener");
      return [accent("Opening résumé PDF…")];
    case "sudo":
      return args.join(" ").includes("hire")
        ? [accent("Permission granted ✓"), out(`Great choice. Email ${profile.email} and I'll reply within a day.`)]
        : [{ kind: "err", text: "Nice try. Maybe: sudo hire vamshi" }];
    case "clear":
    case "cls":
      return "clear";
    default:
      return [{ kind: "err", text: `command not found: ${name}. Type 'help'.` }];
  }
}

const BOOT: Line[] = [
  { kind: "accent", text: "vamshi-os v2.0 · interactive résumé" },
  { kind: "out", text: "Type 'help' to see commands. Tab completes, ↑ recalls." },
];

const COMMANDS = ["help", "about", "projects", "open ", "experience", "skills", "roles", "education", "contact", "resume", "clear", "sudo hire vamshi"];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const body = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight });
  }, [lines]);

  const submit = (cmd: string) => {
    const res = run(cmd);
    setHistory((h) => (cmd.trim() ? [cmd, ...h] : h));
    setCursor(-1);
    if (res === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: cmd }, ...res]);
    setValue("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit(value);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      if (history[next] !== undefined) {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(Math.max(next, -1));
      setValue(next >= 0 ? history[next] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const hit = COMMANDS.find((c) => c.startsWith(value.toLowerCase()) && value);
      if (hit) setValue(hit);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const COLORS: Record<Line["kind"], string> = { in: "text-white", out: "text-slate-400", accent: "text-neon-cyan", err: "text-rose-400" };

  return (
    <section id="terminal" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader eyebrow="05 · Terminal" title={<>Prefer the command line?</>} sub="My résumé as an interactive shell. Try 'about', 'projects' or 'sudo hire vamshi'." />
      <div className="glass overflow-hidden rounded-3xl" onClick={() => input.current?.focus()}>
        <div className="flex items-center gap-2 border-b border-white/5 bg-black/30 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-slate-500">
            <TerminalSquare size={13} /> vamshi@portfolio: ~
          </span>
        </div>
        <div ref={body} className="h-[360px] overflow-y-auto bg-black/40 p-5 font-mono text-[13px] leading-6">
          {lines.map((l, i) => (
            <div key={i} className={`whitespace-pre-wrap break-words ${COLORS[l.kind]}`}>
              {l.kind === "in" && <span className="text-neon-emerald">➜ ~ </span>}
              {l.text}
            </div>
          ))}
          <div className="flex items-center">
            <span className="text-neon-emerald">➜ ~&nbsp;</span>
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              aria-label="Terminal input"
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              className="flex-1 bg-transparent text-white caret-neon-cyan outline-none"
              placeholder="type help"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-white/5 bg-black/20 px-4 py-3">
          {["about", "projects", "roles", "skills", "contact", "clear"].map((c) => (
            <button key={c} onClick={() => submit(c)} className="rounded-lg border border-white/10 px-2.5 py-1 font-mono text-xs text-slate-300 transition hover:border-neon-cyan/40 hover:text-neon-cyan">
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
