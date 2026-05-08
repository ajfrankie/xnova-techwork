import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Target, Eye, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — XNOVA" },
      { name: "description", content: "XNOVA delivers high-impact solutions through innovation, precision and collaboration across technology and engineering." },
      { property: "og:title", content: "About — XNOVA" },
      { property: "og:description", content: "Innovation, precision and collaboration — meet the team behind XNOVA." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    { Icon: Target, title: "Mission", text: "To engineer scalable, future-ready solutions that empower businesses to thrive in the digital era." },
    { Icon: Eye, title: "Vision", text: "To be the catalyst that bridges technology and human creativity, shaping smarter ecosystems worldwide." },
    { Icon: Sparkles, title: "Values", text: "Innovation, integrity, precision and a relentless drive to deliver excellence in everything we build." },
  ];

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">About XNOVA</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Built to deliver <span className="text-gradient">high-impact solutions</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            XNOVA is committed to delivering high-impact solutions through innovation, precision and collaboration.
            Our multidisciplinary expertise allows us to design and implement systems that align with modern business demands.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="card-hover h-full rounded-2xl border border-border bg-gradient-surface p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <v.Icon size={22} />
                </div>
                <h3 className="mt-6 text-xl font-bold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-12 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-bold md:text-4xl">Our story</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We started with a single belief: that technology should serve people, not the other way around.
              Today XNOVA brings together engineers, designers and analysts to solve real-world problems with
              clarity and craft. Every product we ship is a small step toward a more intelligent, connected world.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="rounded-2xl border border-border bg-gradient-surface p-8">
              <h3 className="text-xl font-bold">What sets us apart</h3>
              <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
                {[
                  "Cross-disciplinary teams blending engineering and design",
                  "Research-backed methodology with measurable outcomes",
                  "Long-term partnerships, not transactional engagements",
                  "Commitment to scalable, secure and elegant systems",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
