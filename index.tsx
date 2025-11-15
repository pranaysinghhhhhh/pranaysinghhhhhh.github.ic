import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Github, Linkedin, Instagram, Moon, Sun } from "lucide-react";

const PROJECTS = [
  {
    title: "Nova Commerce",
    slug: "nova-commerce",
    role: "Brand, Web, Motion",
    year: "2025",
    cover: "linear-gradient(135deg,#111 0%,#666 100%)",
    tags: ["E-commerce", "Micro-interactions", "A/B tested"],
  },
  {
    title: "Astra Studio",
    slug: "astra-studio",
    role: "Design Lead",
    year: "2024",
    cover: "linear-gradient(135deg,#111 0%,#999 100%)",
    tags: ["Portfolio", "3D", "Case study"],
  },
  {
    title: "Axiom Labs",
    slug: "axiom-labs",
    role: "Product, Site",
    year: "2024",
    cover: "linear-gradient(135deg,#111 0%,#bbb 100%)",
    tags: ["SaaS", "Dark UI", "Conversion"],
  },
];

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    try {
      return localStorage.getItem("theme") || "dark";
    } catch (e) {
      return "dark";
    }
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  return { theme, setTheme };
}

const HoverLink = ({ children, href, className = "" }) => (
  <a href={href} className={`group inline-flex items-center gap-1 transition-all duration-200 ${className}`}>
    <span className="relative">
      <span className="bg-gradient-to-r from-white/80 to-white bg-clip-text text-transparent dark:from-white dark:to-white/80">{children}</span>
      <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-white/60 transition-all duration-300 group-hover:w-full" />
    </span>
    <ArrowUpRight className="h-4 w-4 translate-y-0.5 opacity-0 transition group-hover:opacity-100" />
  </a>
);

const Header = ({ theme, setTheme }) => {
  const links = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];
  
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur bg-black/10 dark:bg-black/20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#home" className="font-semibold tracking-tight text-white">▣ Vishu Webs</a>
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/80 hover:text-white">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="rounded-2xl border border-white/10 px-3 py-1 text-white/80 hover:text-white">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

const BackgroundGrid = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none">
    <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent)]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
    <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-950" />
  </div>
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-white origin-left" />;
};

const Marquee = ({ items = [] }) => (
  <div className="relative select-none whitespace-nowrap py-4 text-white/30">
    <div className="animate-[marquee_20s_linear_infinite] will-change-transform">
      {Array(2).fill(0).map((_, i) => (
        <span key={i} className="pr-8">
          {items.map((it, idx) => <span key={`${i}-${idx}`} className="mx-3 text-sm tracking-widest">{it} •</span>)}
        </span>
      ))}
    </div>
    <style>{`@keyframes marquee {from{transform: translateX(0)} to{transform: translateX(-50%)}}`}</style>
  </div>
);

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative flex min-h-[90vh] items-end overflow-hidden pt-28">
      <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent)]" />
      </motion.div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24">
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-balance font-[1000] leading-[0.9] tracking-tight text-white" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
          Hola Amigo, Welcome to the Vishu Webs......!
        </motion.h1>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-6 flex flex-wrap items-center gap-4 text-white/80">
          <HoverLink href="#work">See selected work</HoverLink>
          <span className="h-4 w-px bg-white/20" />
          <HoverLink href="#contact">Start a project</HoverLink>
        </motion.div>
        <div className="pointer-events-none mt-12 overflow-hidden">
          <Marquee items={["Brand", "Web", "Motion", "Identity", "Strategy", "Prototyping", "Dev"]} />
        </div>
      </div>
    </section>
  );
};

const Work = () => (
  <section id="work" className="mx-auto max-w-6xl px-4 py-20">
    <div className="mb-8 flex items-end justify-between">
      <h2 className="text-3xl font-bold text-white md:text-5xl">Selected Work</h2>
      <a href="#contact" className="hidden text-white/70 hover:text-white md:block">Available from Sept 2025</a>
    </div>
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {PROJECTS.map((p, i) => (
        <div key={p.slug} className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" style={{ aspectRatio: "16 / 10" }}>
          <div className="absolute inset-0" style={{ background: p.cover }} />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 z-10 p-4 md:p-6">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white md:text-2xl">{p.title}</h3>
                <p className="text-xs text-white/60 md:text-sm">{p.role} • {p.year}</p>
              </div>
              <div className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CaseStudyStrip = ({ p, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  return (
    <section id={`case-${p.slug}`} ref={ref} className="relative overflow-hidden border-y border-white/10 bg-black/30 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.06),transparent)]" />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-2">
        <motion.div style={{ y }} className="relative h-72 overflow-hidden rounded-2xl border border-white/10 md:h-96">
          <div className="absolute inset-0" style={{ background: p.cover }} />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/0 mix-blend-overlay" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-semibold text-white md:text-4xl">{p.title}</h3>
          <p className="mt-3 max-w-prose text-white/70">A concise case study intro goes here. Describe the problem, your approach, and measurable impact. Keep it short.</p>
          <ul className="mt-4 flex flex-wrap gap-2 text-xs text-white/50">{p.tags.map((t) => <li key={t} className="rounded-full border border-white/10 px-3 py-1">{t}</li>)}</ul>
          <div className="mt-6"><HoverLink href="#contact">View full case study</HoverLink></div>
        <div className="flex justify-center mt-6">
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBk...RgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIy" className="w-40 h-40 rounded-full object-cover border border-white/10" />
        </div>
      </div>
    </div>
  </section>
  );
};

const About = () => (
  <section id="about" className="mx-auto max-w-6xl px-4 py-20">
    <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
      <div className="md:col-span-3">
        <h2 className="text-3xl font-bold text-white md:text-5xl">Independent Designer & Front-end Dev</h2>
        <p className="mt-4 text-white/70">I create high-contrast, performance-minded websites and identities for brands that like to move fast. From strategy to final build, I keep teams aligned on narrative, visuals, and speed.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-white/60">{["Figma","Framer","React","Next.js","GSAP","Motion","Tailwind","WebGL"].map((s) => <span key={s} className="rounded-full border border-white/10 px-3 py-1">{s}</span>)}</div>
      </div>
      <div className="md:col-span-2">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
          <h3 className="text-lg font-semibold text-white">Capabilities</h3>
          <ul className="mt-3 space-y-2 text-white/70">
            <li>Art direction & brand identity</li>
            <li>Product & marketing sites</li>
            <li>Prototyping & micro-interactions</li>
            <li>Design systems & dev handoff</li>
          </ul>
          <div className="mt-6 text-sm text-white/60">Based in ✦ Remote • Available worldwide</div>
        </div>
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="mx-auto max-w-6xl px-4 py-20">
    <h2 className="text-3xl font-bold text-white md:text-5xl">Services</h2>
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">{[{title:"Brand & Identity",desc:"Logos, typography, systems that scale across touchpoints."},{title:"Web Design",desc:"Story-driven, responsive, and lightning-fast interfaces."},{title:"Front-end Dev",desc:"Production-ready React/Next with a11y and performance."}].map((s)=> <div key={s.title} className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6"><h3 className="text-lg font-semibold text-white">{s.title}</h3><p className="mt-2 text-white/70">{s.desc}</p></div>)}</div>
  </section>
);

const Contact = () => (
  <section id="contact" className="mx-auto max-w-6xl px-4 py-24">
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-900/20 p-8">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-white md:text-5xl">Have a project in mind?</h2>
          <p className="mt-2 max-w-prose text-white/70">I usually reply within 24 hours. Tell me about timelines, goals, and constraints.</p>
        </div>
        <div className="flex gap-3">
          <a href="mailto:you@example.com" className="rounded-xl border border-white/10 px-5 py-3 text-white/90 hover:bg-white hover:text-black">Email me</a>
          <a href="#" className="rounded-xl border border-white/10 px-5 py-3 text-white/90 hover:bg-white hover:text-black">Download CV</a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-white/10 py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
      <p className="text-white/60">© {new Date().getFullYear()} Vishu Webs. All rights reserved.</p>
      <div className="flex items-center gap-4 text-white/70">
        <a href="#" aria-label="Email"><Mail className="h-5 w-5" /></a>
        <a href="#" aria-label="Phone"><Phone className="h-5 w-5" /></a>
        <a href="#" aria-label="GitHub"><Github className="h-5 w-5" /></a>
        <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5" /></a>
        <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5" /></a>
      </div>
    </div>
  </footer>
);

export default function PortfolioInspiredClone() {
  const { theme, setTheme } = useTheme();
  return (
    <main className="min-h-screen scroll-smooth bg-black text-white antialiased">
      <BackgroundGrid />
      <ScrollProgress />
      <Header theme={theme} setTheme={setTheme} />
      <Hero />
      <Work />
      {PROJECTS.map((p, i) => (
        <CaseStudyStrip key={p.slug} p={p} index={i} />
      ))}
      <About />
      <Services />
      <Contact />
      <Footer />
      <div className="h-10" />
    </main>
  );
}
