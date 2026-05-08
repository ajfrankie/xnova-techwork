import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — XNOVA" },
      { name: "description", content: "R&D in AI, data science, engineering, GIS and digital innovation." },
      { property: "og:title", content: "Research — XNOVA" },
      { property: "og:description", content: "Exploring emerging technologies and innovative methodologies." },
    ],
  }),
  component: ResearchPage,
});

const categories = ["All", "AI and Data Science", "Engineering and GIS", "Digital Innovation", "Business Analytics"] as const;
type Cat = typeof categories[number];

const articles: { title: string; summary: string; date: string; cat: Exclude<Cat, "All"> }[] = [
  { title: "Foundations of Predictive Maintenance", summary: "How time-series modeling reshapes industrial reliability.", date: "Apr 2026", cat: "AI and Data Science" },
  { title: "Geo-Intelligence at Scale", summary: "Leveraging satellite + IoT signals for urban planning.", date: "Mar 2026", cat: "Engineering and GIS" },
  { title: "Composable Digital Platforms", summary: "Why modular architectures outperform monoliths.", date: "Feb 2026", cat: "Digital Innovation" },
  { title: "From Dashboards to Decisions", summary: "Designing analytics that drive measurable action.", date: "Feb 2026", cat: "Business Analytics" },
  { title: "Edge AI for Real-Time Systems", summary: "Inference patterns at the edge — latency, cost, accuracy.", date: "Jan 2026", cat: "AI and Data Science" },
  { title: "Sustainable Engineering Workflows", summary: "Reducing waste through digital twins and simulation.", date: "Jan 2026", cat: "Engineering and GIS" },
];

function ResearchPage() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? articles : articles.filter((a) => a.cat === active);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Research</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Exploring what's <span className="text-gradient">next</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            XNOVA actively engages in research and development to explore emerging technologies and innovative
            methodologies — advancing knowledge in analytics, engineering systems and digital transformation.
          </p>
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
          {filtered.map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <article className="card-hover flex h-full flex-col rounded-2xl border border-border bg-gradient-surface p-7">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{a.cat}</p>
                <h3 className="mt-3 text-lg font-bold leading-snug">{a.title}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{a.summary}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{a.date}</span>
                  <button className="group/btn inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    Read More
                    <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  );
}
