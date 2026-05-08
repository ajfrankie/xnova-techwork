import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import p1 from "@/assets/proj-1.jpg";
import p2 from "@/assets/proj-2.jpg";
import p3 from "@/assets/proj-3.jpg";
import p4 from "@/assets/proj-4.jpg";
import p5 from "@/assets/proj-5.jpg";
import p6 from "@/assets/proj-6.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — XNOVA" },
      { name: "description", content: "Selected work across analytics, engineering, mobile, AI and digital platforms." },
      { property: "og:title", content: "Projects — XNOVA" },
      { property: "og:description", content: "A portfolio of solutions delivered with craft and precision." },
    ],
  }),
  component: ProjectsPage,
});

const categories = ["All", "Software", "Analytics", "Engineering", "AI", "Digital"] as const;
type Cat = typeof categories[number];

const projects: { title: string; desc: string; img: string; cat: Exclude<Cat, "All"> }[] = [
  { title: "Insight Platform", desc: "Enterprise analytics dashboard with real-time KPIs.", img: p1, cat: "Analytics" },
  { title: "GeoFlow Mapping", desc: "Geospatial planning suite for infrastructure teams.", img: p2, cat: "Engineering" },
  { title: "Pulse Mobile", desc: "Cross-platform mobile experience with offline-first sync.", img: p3, cat: "Software" },
  { title: "MechaCAD Studio", desc: "3D engineering visualization for design review.", img: p4, cat: "Engineering" },
  { title: "Cortex AI", desc: "ML pipeline for predictive maintenance at scale.", img: p5, cat: "AI" },
  { title: "Marketplace OS", desc: "Modular commerce platform for digital-first brands.", img: p6, cat: "Digital" },
];

function ProjectsPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Selected work</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Projects we are <span className="text-gradient">proud of</span>.
          </h1>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all sm:px-5 sm:py-2 sm:text-sm ${
                active === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <article className="card-hover group overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={800} height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <span className="absolute left-4 top-4 rounded-full bg-card/80 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                    {p.cat}
                  </span>
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
    </Layout>
  );
}
