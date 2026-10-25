import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";
import { cn } from "../lib/cn";
import { useSpotlight } from "../hooks/useSpotlight";

export function SpotlightCard({ className, children, ...rest }: HTMLMotionProps<"div">) {
  const onMove = useSpotlight<HTMLDivElement>();
  return (
    <motion.div
      onMouseMove={onMove}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn("glass spotlight rounded-3xl", className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

// 3D tilt that follows the cursor; springs back on leave.
export function TiltCard({ className, children, max = 12 }: { className?: string; children: React.ReactNode; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const glareX = useTransform(x, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(y, [0, 1], ["0%", "100%"]);
  const glare = useTransform([glareX, glareY], ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.22), transparent 55%)`);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onMouseLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", transformPerspective: 1000 }}
      className={cn("relative", className)}
    >
      {children}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit]" style={{ background: glare }} />
    </motion.div>
  );
}

export function SectionHeader({ eyebrow, title, sub, className }: { eyebrow: string; title: React.ReactNode; sub?: string; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mb-10 max-w-3xl", className)}
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{sub}</p>}
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ACCENTS = {
  cyan: "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
  indigo: "text-neon-indigo border-neon-indigo/30 bg-neon-indigo/10",
  emerald: "text-neon-emerald border-neon-emerald/30 bg-neon-emerald/10",
  amber: "text-neon-amber border-neon-amber/30 bg-neon-amber/10",
  pink: "text-neon-pink border-neon-pink/30 bg-neon-pink/10",
} as const;

export function Pill({ children, accent = "cyan", className }: { children: React.ReactNode; accent?: keyof typeof ACCENTS; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px]", ACCENTS[accent], className)}>{children}</span>;
}

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">{children}</span>;
}
