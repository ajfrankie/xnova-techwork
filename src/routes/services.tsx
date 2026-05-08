import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Code2, BarChart3, Cog, Map, BrainCircuit, Cloud, X, CheckCircle2 } from "lucide-react";
import software from "@/assets/svc-software.jpg";
import analytics from "@/assets/svc-analytics.jpg";
import engineering from "@/assets/svc-engineering.jpg";
import gis from "@/assets/svc-gis.jpg";
import ai from "@/assets/svc-ai.jpg";
import digital from "@/assets/svc-digital.jpg";
import { useState } from "react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — XNOVA" },
      { name: "description", content: "Software development, analytics, engineering, GIS, AI and digital transformation — built for scale." },
      { property: "og:title", content: "Services — XNOVA" },
      { property: "og:description", content: "Six core capabilities engineered for the modern enterprise." },
    ],
  }),
  component: ServicesPage,
});

interface Service {
  Icon: React.ElementType;
  title: string;
  desc: string;
  img: string;
  details: string;
  highlights: string[];
}

const services: Service[] = [
  {
    Icon: Code2,
    title: "Software Development",
    desc: "End-to-end web and mobile applications crafted with modern stacks, clean architecture and a relentless focus on user experience.",
    img: software,
    details:
      "We design and build scalable web and mobile products from the ground up — or step in to modernize existing systems. Our engineering teams work across the full stack, from pixel-perfect frontends to robust backend APIs and cloud infrastructure.",
    highlights: [
      "Custom web & mobile application development",
      "API design, integration & microservices",
      "UI/UX design and prototyping",
      "Code audits, refactoring & performance tuning",
      "DevOps, CI/CD pipelines & cloud deployment",
    ],
  },
  {
    Icon: BarChart3,
    title: "Data Analytics",
    desc: "Transform raw data into clear, actionable insights through dashboards, modeling and statistical analysis.",
    img: analytics,
    details:
      "We help organizations unlock the value hidden in their data. From building data pipelines to delivering executive dashboards, our analysts and engineers turn complexity into clarity — enabling faster, more confident decisions.",
    highlights: [
      "Business intelligence dashboards & reporting",
      "Data pipeline design and ETL automation",
      "Statistical modeling & forecasting",
      "KPI frameworks and performance tracking",
      "Data quality audits and governance",
    ],
  },
  {
    Icon: Cog,
    title: "Engineering Solutions",
    desc: "Multidisciplinary engineering services covering systems design, automation and mechanical workflows.",
    img: engineering,
    details:
      "Our engineering practice spans mechanical, systems and process domains. We bring rigorous design thinking to complex challenges — delivering solutions that are reliable, efficient and built to last.",
    highlights: [
      "Systems architecture and design reviews",
      "Mechanical design and CAD modeling",
      "Process automation and workflow optimization",
      "Prototyping, testing and validation",
      "Technical documentation and compliance support",
    ],
  },
  {
    Icon: Map,
    title: "GIS & Geospatial",
    desc: "Spatial intelligence, mapping and geo-analytics for planning, logistics and environmental insight.",
    img: gis,
    details:
      "We develop geospatial solutions that help clients understand and act on location-based data. From interactive maps to advanced spatial analysis, we bring geographic intelligence to planning, operations and research.",
    highlights: [
      "Interactive web mapping and GIS portals",
      "Spatial data analysis and visualization",
      "Remote sensing and satellite imagery processing",
      "Route optimization and logistics mapping",
      "Environmental and land-use analysis",
    ],
  },
  {
    Icon: BrainCircuit,
    title: "AI & Machine Learning",
    desc: "Custom models, intelligent automation and ML pipelines that turn complexity into competitive advantage.",
    img: ai,
    details:
      "We build AI systems that solve real problems — not demos. From natural language processing to computer vision and predictive analytics, our ML engineers design, train and deploy models that integrate seamlessly into your workflows.",
    highlights: [
      "Custom ML model development and training",
      "Natural language processing (NLP) solutions",
      "Computer vision and image recognition",
      "Predictive analytics and anomaly detection",
      "MLOps, model monitoring and retraining pipelines",
    ],
  },
  {
    Icon: Cloud,
    title: "Digital Transformation",
    desc: "Cloud strategy, modernization and process redesign to align technology with business outcomes.",
    img: digital,
    details:
      "We guide organizations through the full arc of digital change — from strategy and roadmapping to hands-on implementation. Our approach is pragmatic: we focus on outcomes, not buzzwords, and we move at the pace your business demands.",
    highlights: [
      "Digital strategy and technology roadmapping",
      "Cloud migration and infrastructure modernization",
      "Legacy system assessment and re-platforming",
      "Change management and stakeholder enablement",
      "Process redesign and operational efficiency",
    ],
  },
];

function ServicesPage() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">What we do</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Services engineered for <span className="text-gradient">measurable impact</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From foundational systems to advanced intelligence, our services are designed to scale with your ambitions.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <article
                role="button"
                tabIndex={0}
                onClick={() => setSelected(s)}
                onKeyDown={(e) => e.key === "Enter" && setSelected(s)}
                className="card-hover group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-gradient-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={800} height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                </div>
                <div className="flex flex-1 flex-col gap-3 border-t-2 border-primary p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <s.Icon size={20} />
                    </div>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                  <p className="mt-auto pt-2 text-xs font-semibold text-primary">Learn more →</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Detail modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-[16/7] overflow-hidden rounded-t-3xl">
              <img src={selected.img} alt={selected.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            </div>

            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-colors hover:bg-muted"
            >
              <X size={18} />
            </button>

            {/* Content */}
            <div className="p-5 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <selected.Icon size={22} />
                </div>
                <h2 className="text-xl font-bold sm:text-2xl">{selected.title}</h2>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{selected.details}</p>

              <div className="mt-7">
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">What's included</p>
                <ul className="mt-4 space-y-3">
                  {selected.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/contact"
                  className="rounded-lg bg-gradient-primary px-6 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
                >
                  Get in touch
                </a>
                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
