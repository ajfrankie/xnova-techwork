import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { ParticleBackground } from "@/components/ParticleBackground";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { ArrowRight, Code2, BarChart3, Cog, Map, BrainCircuit, Cloud } from "lucide-react";
import p1 from "@/assets/proj-1.jpg";
import p2 from "@/assets/proj-2.jpg";
import p5 from "@/assets/proj-5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "XNOVA — Innovating Smart Solutions for the Modern World" },
      { name: "description", content: "XNOVA delivers innovative technology, engineering and digital transformation solutions for forward-thinking organizations." },
      { property: "og:title", content: "XNOVA — Innovating Smart Solutions" },
      { property: "og:description", content: "Where creativity meets engineering — scalable, future-ready solutions." },
    ],
  }),
  component: Index,
});

const services = [
  { Icon: Code2, title: "Software Development", desc: "Web, mobile and backend systems engineered for scale." },
  { Icon: BarChart3, title: "Data Analytics", desc: "Decision-ready insights from complex data." },
  { Icon: Cog, title: "Engineering Solutions", desc: "Multidisciplinary engineering and automation." },
  { Icon: Map, title: "GIS & Geospatial", desc: "Spatial intelligence for planning and logistics." },
  { Icon: BrainCircuit, title: "AI & Machine Learning", desc: "Custom models and intelligent automation." },
  { Icon: Cloud, title: "Digital Transformation", desc: "Cloud, modernization and process redesign." },
];

const partners = ["RETRO THE CAKE LAB", "THALAM ORGANIZATION", "TORONTO SMASHERS BADMINTON CLUB"];

function Index() {
  return (
    <Layout>
      {/* HERO */}
      <section className="relative -mt-20 flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial" />
        <ParticleBackground />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20">
          <div className="max-w-4xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Technology · Engineering · Digital
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl">
                Innovating <span className="text-gradient">Smart Solutions</span>
                <br />for the Modern World
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                Where creativity meets engineering. We design and deliver future-ready systems for organizations that refuse to stand still.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-105">
                  Get Started
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/services" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-primary hover:text-primary">
                  Explore Services
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              A forward-thinking solutions company.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              XNOVA delivers innovative and scalable services across technology, engineering and digital transformation.
              We combine technical expertise with creative thinking to build efficient and future-ready solutions.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Learn more about us <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Services</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            Capabilities that move your business forward.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="card-hover group h-full rounded-2xl border border-border bg-gradient-surface p-8 border-l-2 border-l-primary">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
                  <s.Icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-gradient-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 grid-cols-2 md:grid-cols-4">
          {[
            { n: 5, label: "Projects Completed" },
            { n: 3, label: "Companies Served" },
            { n: 6, label: "Core Expertise Areas" },
            { n: 100, label: "Commitment to Quality", suffix: "%" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="text-center">
                <div className="font-display text-4xl font-bold text-gradient md:text-6xl">
                  <Counter to={s.n} suffix={s.suffix ?? "+"} />
                </div>
                <p className="mt-2 text-xs font-medium text-muted-foreground md:text-sm">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Projects</p>
              <h2 className="mt-4 text-4xl font-bold md:text-5xl">Selected work</h2>
            </div>
            <Link to="/projects" className="hidden items-center gap-1.5 text-sm font-medium text-primary md:inline-flex">
              View all <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { img: p1, title: "Insight Platform", desc: "Real-time analytics dashboard." },
            { img: p2, title: "GeoFlow Mapping", desc: "Geospatial planning suite." },
            { img: p5, title: "Cortex AI", desc: "Predictive ML at scale." },
          ].map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <article className="card-hover group overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={800} height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARTNER MARQUEE */}
      <section className="border-y border-border bg-surface py-14">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Trusted by forward-thinking teams</p>
        </Reveal>
        <div className="group mt-10 overflow-hidden">
          <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-16 group-hover:[animation-play-state:paused]">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="font-display text-2xl font-bold tracking-widest text-muted-foreground/60 transition-colors hover:text-primary">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-surface px-6 py-12 text-center md:p-20">
            <div className="absolute inset-0 bg-gradient-radial opacity-50" />
            <div className="relative">
              <h2 className="text-3xl font-bold leading-tight md:text-5xl">
                Let's build <span className="text-gradient">smarter solutions</span> together.
              </h2>
              <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-105">
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
