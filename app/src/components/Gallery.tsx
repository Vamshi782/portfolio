import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import { gallery, route, type Photo } from "../data/content";
import { useSpotlight } from "../hooks/useSpotlight";
import { SectionHeader, TiltCard } from "./ui";
import { cn } from "../lib/cn";

const SHAPE: Record<Photo["shape"], string> = {
  portrait: "row-span-2",
  landscape: "col-span-2",
  feature: "col-span-2 row-span-2",
};

function Route() {
  return (
    <div className="glass relative mb-8 overflow-hidden rounded-3xl px-4 py-6 sm:px-8">
      <div className="relative grid grid-cols-5 gap-2">
        <div aria-hidden className="absolute left-[10%] right-[10%] top-[9px] h-px bg-white/10" />
        <motion.div
          aria-hidden
          className="absolute left-[10%] right-[10%] top-[9px] h-px origin-left bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-emerald"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          aria-hidden
          className="absolute top-[5px] h-[9px] w-[9px] rounded-full bg-white shadow-[0_0_16px_4px_rgba(34,211,238,0.8)]"
          initial={{ left: "10%" }}
          animate={{ left: ["10%", "90%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          style={{ x: "-50%" }}
        />
        {route.map((r, i) => (
          <motion.div
            key={r.city}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 + i * 0.25 }}
            className="relative flex flex-col items-center text-center"
          >
            <span
              className={cn(
                "relative z-10 mb-3 grid h-[19px] w-[19px] place-items-center rounded-full border bg-ink",
                r.city.startsWith("Dallas") ? "border-neon-emerald shadow-[0_0_18px_rgba(52,211,153,0.6)]" : "border-neon-cyan/60",
              )}
            >
              <span className={cn("h-[7px] w-[7px] rounded-full", r.city.startsWith("Dallas") ? "animate-pulse bg-neon-emerald" : "bg-neon-cyan")} />
            </span>
            <span className="text-[11px] font-medium leading-tight text-white sm:text-sm">{r.city}</span>
            <span className="mt-0.5 hidden text-xs text-slate-500 sm:block">{r.note}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Tile({ p, i, onOpen }: { p: Photo; i: number; onOpen: () => void }) {
  const onMove = useSpotlight<HTMLButtonElement>();
  return (
    <motion.div
      className={cn(SHAPE[p.shape])}
      initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard max={7} className="h-full rounded-2xl">
        <button
          onClick={onOpen}
          onMouseMove={onMove}
          aria-label={`Open photo: ${p.caption}`}
          className="spotlight group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-800"
        >
          <img
            src={p.src}
            alt={p.caption}
            loading="lazy"
            style={{ objectPosition: p.pos ?? "50% 50%" }}
            className="h-full w-full scale-[1.02] object-cover transition-[transform,filter] duration-[1600ms] ease-out group-hover:scale-110 group-hover:saturate-[1.15]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 via-transparent to-neon-indigo/0 mix-blend-overlay transition duration-700 group-hover:from-neon-cyan/25 group-hover:to-neon-indigo/30" />
          {p.place && (
            <span className="glass absolute left-3 top-3 inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[10px] text-white">
              <MapPin size={11} className="text-neon-cyan" /> {p.place}
            </span>
          )}
          <span className="absolute inset-x-0 bottom-0 translate-y-1 p-3 text-left text-xs font-medium leading-snug text-white transition duration-500 group-hover:translate-y-0 sm:p-4 sm:text-sm">
            {p.caption}
          </span>
        </button>
      </TiltCard>
    </motion.div>
  );
}

function StoryTile() {
  return (
    <motion.div
      className="col-span-2 row-span-3 sm:row-span-2"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6">
        <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-neon-emerald/20 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-neon-indigo/25 blur-3xl" />
        <div className="relative">
          <p className="eyebrow">The through-line</p>
          <p className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
            New city, new team, same habit: <span className="text-gradient">show up and build.</span>
          </p>
        </div>
        <div className="relative mt-6 grid grid-cols-2 gap-2 text-center sm:grid-cols-4">
          {[
            ["2", "countries"],
            ["5", "cities"],
            ["~45K", "community"],
            ["8K+", "LinkedIn"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-white/10 bg-black/25 px-2 py-3">
              <div className="text-xl font-semibold text-white">{v}</div>
              <div className="text-[11px] text-slate-400">{l}</div>
            </div>
          ))}
        </div>
        <a href="#contact" className="relative mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-neon-cyan">
          Let's work together <ArrowRight size={15} />
        </a>
      </div>
    </motion.div>
  );
}

const firstExtra = gallery.findIndex((p) => !p.featured);
const extras = gallery.filter((p) => !p.featured);

function MoreMoments({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass group mx-auto mt-6 flex w-fit items-center gap-4 rounded-full py-2 pl-2 pr-5"
    >
      <span className="flex -space-x-3">
        {extras.slice(0, 5).map((p) => (
          <img key={p.src} src={p.src} alt="" loading="lazy" className="h-9 w-9 rounded-full border-2 border-ink object-cover transition group-hover:scale-105" />
        ))}
      </span>
      <span className="text-sm text-slate-200">
        +{extras.length} more moments <ArrowRight size={14} className="ml-1 inline text-neon-cyan transition group-hover:translate-x-0.5" />
      </span>
    </motion.button>
  );
}

export default function Gallery() {
  const [zoom, setZoom] = useState<number | null>(null);
  const step = useCallback((d: number) => setZoom((z) => (z === null ? z : (z + d + gallery.length) % gallery.length)), []);

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, step]);

  return (
    <section id="life" className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeader
        eyebrow="06 · Beyond the dashboard"
        title={
          <>
            From India to Portland, <span className="text-gradient">Boston, Dallas & the Bay Area.</span>
          </>
        }
        sub="A few moments from the journey: graduating from Northeastern, building a community at the Roux Institute, making Dallas–Fort Worth home, and visiting Google in Mountain View."
      />

      <Route />

      <div className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-4 md:gap-4">
        {gallery.map((p, i) => p.featured && <Tile key={p.src} p={p} i={i} onOpen={() => setZoom(i)} />)}
        <StoryTile />
      </div>

      <MoreMoments onOpen={() => setZoom(firstExtra)} />

      <AnimatePresence>
        {zoom !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-ink/90 p-4 backdrop-blur-xl"
            onClick={() => setZoom(null)}
            role="dialog"
            aria-modal="true"
          >
            <button className="absolute right-4 top-4 rounded-full p-2 text-slate-300 hover:bg-white/10" aria-label="Close">
              <X />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="glass absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2.5 text-white sm:left-6"
              aria-label="Previous photo"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="glass absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full p-2.5 text-white sm:right-6"
              aria-label="Next photo"
            >
              <ChevronRight />
            </button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={zoom}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
                transition={{ duration: 0.35 }}
                className="flex max-h-[88vh] max-w-3xl flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={gallery[zoom].src} alt={gallery[zoom].caption} className="max-h-[76vh] rounded-2xl border border-white/10 object-contain shadow-[0_30px_120px_-20px_rgba(34,211,238,0.35)]" />
                <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-200">
                  {gallery[zoom].place && (
                    <span className="inline-flex items-center gap-1 font-mono text-xs text-neon-cyan">
                      <MapPin size={12} /> {gallery[zoom].place}
                    </span>
                  )}
                  <span>{gallery[zoom].caption}</span>
                  <span className="font-mono text-xs text-slate-500">
                    {zoom + 1} / {gallery.length}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
