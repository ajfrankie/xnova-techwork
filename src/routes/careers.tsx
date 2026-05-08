import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { useMemo, useState } from "react";
import { MapPin, Briefcase } from "lucide-react";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — XNOVA" },
      { name: "description", content: "Join XNOVA. We're hiring across tech, engineering, marketing and analytics." },
      { property: "og:title", content: "Careers — XNOVA" },
      { property: "og:description", content: "Build the future with a team that values craft, curiosity and impact." },
    ],
  }),
  component: CareersPage,
});

type Status = "Available" | "Closed";
type Category = "Tech" | "Engineering" | "Marketing" | "Analytics";
type JobType = "Full-time" | "Part-time" | "Internship";

interface Job {
  title: string;
  desc: string;
  category: Category;
  type: JobType;
  location: string;
  status: Status;
}

const jobs: Job[] = [
  { title: "Senior Frontend Engineer", desc: "Build performant, accessible interfaces for our flagship platforms.", category: "Tech", type: "Full-time", location: "Remote", status: "Closed" },
  { title: "Backend Engineer", desc: "Design APIs and services that power mission-critical systems.", category: "Tech", type: "Full-time", location: "Hybrid", status: "Closed" },
  { title: "Data Analyst", desc: "Translate raw data into clear, decision-ready insights.", category: "Analytics", type: "Full-time", location: "Remote", status: "Closed" },
  { title: "GIS Engineer", desc: "Develop geospatial workflows and mapping solutions.", category: "Engineering", type: "Full-time", location: "On-site", status: "Closed" },
  { title: "Product Marketing Lead", desc: "Shape positioning, messaging and go-to-market motion.", category: "Marketing", type: "Full-time", location: "Remote", status: "Closed" },
  { title: "ML Research Intern", desc: "Prototype models with our applied research team.", category: "Tech", type: "Internship", location: "Remote", status: "Closed" },
  { title: "Mechanical Design Engineer", desc: "Lead design reviews for precision engineering projects.", category: "Engineering", type: "Part-time", location: "Hybrid", status: "Closed" },
];

const cats: ("All" | Category)[] = ["All", "Tech", "Engineering", "Marketing", "Analytics"];
const types: ("All" | JobType)[] = ["All", "Full-time", "Part-time", "Internship"];
const statuses: ("All" | Status)[] = ["All", "Available", "Closed"];

function CareersPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [typ, setTyp] = useState<(typeof types)[number]>("All");
  const [stat, setStat] = useState<(typeof statuses)[number]>("All");

  const filtered = useMemo(
    () =>
      jobs.filter(
        (j) =>
          (cat === "All" || j.category === cat) &&
          (typ === "All" || j.type === typ) &&
          (stat === "All" || j.status === stat),
      ),
    [cat, typ, stat],
  );

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Careers</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Innovation begins <span className="text-gradient">with people</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            At XNOVA, we are continuously seeking motivated, creative and skilled individuals who are ready to
            contribute to impactful projects and grow in a dynamic environment.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={100}>
          <div className="mt-12 grid gap-4 rounded-2xl border border-border bg-gradient-surface p-6 md:grid-cols-3">
            <FilterGroup label="Category" value={cat} options={cats} onChange={setCat} />
            <FilterGroup label="Type" value={typ} options={types} onChange={setTyp} />
            <FilterGroup label="Status" value={stat} options={statuses} onChange={setStat} />
          </div>
        </Reveal>

        {/* Jobs */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.length === 0 && (
            <p className="col-span-full py-12 text-center text-muted-foreground">No openings match your filters.</p>
          )}
          {filtered.map((j, i) => (
            <Reveal key={j.title} delay={i * 60}>
              <div className="card-hover flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold">{j.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{j.desc}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      j.status === "Available"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {j.status === "Available" ? "Available" : "Closed"}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Briefcase size={14} /> {j.type}</span>
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> {j.location}</span>
                  <span className="rounded-full border border-border px-2 py-0.5">{j.category}</span>
                </div>
                <div className="mt-6">
                  {j.status === "Available" ? (
                    <button
                      onClick={() => {
                        const posInput = document.getElementById("apply-position") as HTMLInputElement | null;
                        if (posInput) posInput.value = j.title;
                        document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full rounded-lg bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.02]"
                    >
                      Apply Now
                    </button>
                  ) : (
                    <button disabled className="w-full cursor-not-allowed rounded-lg border border-border bg-muted px-5 py-2.5 text-sm font-semibold text-muted-foreground">
                      Position Closed
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Why join */}
        <div className="mt-24 grid gap-6 grid-cols-2 md:grid-cols-4">
          {[
            "Growth-oriented environment",
            "Exposure to real-world projects",
            "Collaborative and innovative culture",
            "Opportunities for skill development",
          ].map((t, i) => (
            <Reveal key={t} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-gradient-surface p-6">
                <div className="text-2xl font-bold text-gradient">0{i + 1}</div>
                <p className="mt-3 text-sm font-medium">{t}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Application form */}
        <Reveal>
          <div id="apply-form" className="mt-24 rounded-3xl border border-border bg-gradient-surface p-8 md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">Apply to join us</h2>
            <p className="mt-3 text-muted-foreground">Tell us about yourself — we read every application.</p>
            <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
              <Field label="Full name" type="text" placeholder="Jane Doe" />
              <Field label="Email" type="email" placeholder="jane@example.com" />
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Position</label>
                <input
                  id="apply-position"
                  type="text"
                  placeholder="Which role are you applying for?"
                  className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Resume</label>
                <input type="file" className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary/15 file:px-3 file:py-1.5 file:text-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Message</label>
                <textarea rows={4} placeholder="Why do you want to join XNOVA?" className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
              </div>
              <button className="md:col-span-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.01]">
                Submit Application
              </button>
            </form>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}

function FilterGroup<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (v: T) => void }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              value === o
                ? "bg-primary text-primary-foreground"
                : "bg-surface-elevated text-muted-foreground hover:text-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input type={type} placeholder={placeholder} className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
    </div>
  );
}
