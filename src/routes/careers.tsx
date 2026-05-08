import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { useMemo, useRef, useState } from "react";
import { MapPin, Briefcase, CheckCircle2 } from "lucide-react";

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

// ─── Types ───────────────────────────────────────────────────────────────────

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

interface ApplyForm {
  name: string;
  email: string;
  position: string;
  message: string;
}

interface ApplyErrors {
  name?: string;
  email?: string;
  position?: string;
  message?: string;
  resume?: string;
}

// ─── Security helpers ─────────────────────────────────────────────────────────

/** Strip HTML tags to prevent XSS if value is ever rendered as HTML */
function sanitize(v: string) {
  return v.replace(/<[^>]*>/g, "").trim();
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB

/** Naive client-side rate limit: max 2 submissions per 15 minutes */
const applyTimestamps: number[] = [];
function isRateLimited() {
  const now = Date.now();
  while (applyTimestamps.length && applyTimestamps[0] < now - 15 * 60 * 1000) {
    applyTimestamps.shift();
  }
  return applyTimestamps.length >= 2;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Page ─────────────────────────────────────────────────────────────────────

function CareersPage() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [typ, setTyp] = useState<(typeof types)[number]>("All");
  const [stat, setStat] = useState<(typeof statuses)[number]>("All");

  // Application form state
  const [form, setForm] = useState<ApplyForm>({ name: "", email: "", position: "", message: "" });
  const [errors, setErrors] = useState<ApplyErrors>({});
  const [resumeError, setResumeError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ApplyErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): ApplyErrors {
    const errs: ApplyErrors = {};
    const name = sanitize(form.name);
    const email = sanitize(form.email);
    const position = sanitize(form.position);
    const message = sanitize(form.message);

    if (!name) errs.name = "Full name is required.";
    else if (name.length < 2) errs.name = "Name must be at least 2 characters.";
    else if (name.length > 100) errs.name = "Name must be under 100 characters.";

    if (!email) errs.email = "Email is required.";
    else if (!validateEmail(email)) errs.email = "Enter a valid email address.";
    else if (email.length > 254) errs.email = "Email address is too long.";

    if (!position) errs.position = "Please specify the position you're applying for.";
    else if (position.length > 150) errs.position = "Position must be under 150 characters.";

    if (!message) errs.message = "Please tell us a bit about yourself.";
    else if (message.length < 20) errs.message = "Message must be at least 20 characters.";
    else if (message.length > 3000) errs.message = "Message must be under 3000 characters.";

    // Resume validation
    const file = fileRef.current?.files?.[0];
    if (file) {
      if (!ALLOWED_RESUME_TYPES.includes(file.type)) {
        setResumeError("Only PDF or Word documents are accepted.");
      } else if (file.size > MAX_RESUME_BYTES) {
        setResumeError("File must be under 5 MB.");
      } else {
        setResumeError(undefined);
      }
    }

    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isRateLimited()) {
      setRateLimited(true);
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0 || resumeError) {
      setErrors(errs);
      return;
    }

    applyTimestamps.push(Date.now());

    // TODO: wire up to your backend / email service here
    console.info("Application submitted", {
      name: sanitize(form.name),
      email: sanitize(form.email),
      position: sanitize(form.position),
      message: sanitize(form.message),
    });

    setSubmitted(true);
    setForm({ name: "", email: "", position: "", message: "" });
    setErrors({});
    setResumeError(undefined);
    if (fileRef.current) fileRef.current.value = "";
  }

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
                        setForm((prev) => ({ ...prev, position: j.title }));
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
        <div className="mt-24 grid grid-cols-2 gap-6 md:grid-cols-4">
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
            {submitted ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <CheckCircle2 size={28} />
                </div>
                <h2 className="mt-5 text-2xl font-bold">Application received!</h2>
                <p className="mt-2 text-muted-foreground">Thanks for applying. We review every submission and will be in touch.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-lg border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold md:text-4xl">Apply to join us</h2>
                <p className="mt-3 text-muted-foreground">Tell us about yourself — we read every application.</p>

                {rateLimited && (
                  <div role="alert" className="mt-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Too many submissions. Please wait 15 minutes before trying again.
                  </div>
                )}

                <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
                  {/* Full name */}
                  <div>
                    <label htmlFor="apply-name" className="text-sm font-medium">
                      Full name <span aria-hidden="true" className="text-destructive">*</span>
                    </label>
                    <input
                      id="apply-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      value={form.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "apply-name-error" : undefined}
                      placeholder="Jane Doe"
                      className={`mt-2 block w-full rounded-lg border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${errors.name ? "border-destructive" : "border-border"}`}
                    />
                    {errors.name && <p id="apply-name-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="apply-email" className="text-sm font-medium">
                      Email <span aria-hidden="true" className="text-destructive">*</span>
                    </label>
                    <input
                      id="apply-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={form.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "apply-email-error" : undefined}
                      placeholder="jane@example.com"
                      className={`mt-2 block w-full rounded-lg border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${errors.email ? "border-destructive" : "border-border"}`}
                    />
                    {errors.email && <p id="apply-email-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                  </div>

                  {/* Position */}
                  <div className="md:col-span-2">
                    <label htmlFor="apply-position" className="text-sm font-medium">
                      Position <span aria-hidden="true" className="text-destructive">*</span>
                    </label>
                    <input
                      id="apply-position"
                      name="position"
                      type="text"
                      maxLength={150}
                      value={form.position}
                      onChange={handleChange}
                      aria-invalid={!!errors.position}
                      aria-describedby={errors.position ? "apply-position-error" : undefined}
                      placeholder="Which role are you applying for?"
                      className={`mt-2 block w-full rounded-lg border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${errors.position ? "border-destructive" : "border-border"}`}
                    />
                    {errors.position && <p id="apply-position-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.position}</p>}
                  </div>

                  {/* Resume */}
                  <div className="md:col-span-2">
                    <label htmlFor="apply-resume" className="text-sm font-medium">
                      Resume <span className="text-xs font-normal text-muted-foreground">(PDF or Word, max 5 MB)</span>
                    </label>
                    <input
                      id="apply-resume"
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      aria-describedby={resumeError ? "apply-resume-error" : undefined}
                      aria-invalid={!!resumeError}
                      className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary/15 file:px-3 file:py-1.5 file:text-primary"
                    />
                    {resumeError && <p id="apply-resume-error" role="alert" className="mt-1.5 text-xs text-destructive">{resumeError}</p>}
                  </div>

                  {/* Message */}
                  <div className="md:col-span-2">
                    <label htmlFor="apply-message" className="text-sm font-medium">
                      Message <span aria-hidden="true" className="text-destructive">*</span>
                    </label>
                    <textarea
                      id="apply-message"
                      name="message"
                      rows={4}
                      maxLength={3000}
                      value={form.message}
                      onChange={handleChange}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "apply-message-error" : undefined}
                      placeholder="Why do you want to join XNOVA?"
                      className={`mt-2 block w-full rounded-lg border bg-surface px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${errors.message ? "border-destructive" : "border-border"}`}
                    />
                    <div className="mt-1 flex items-start justify-between gap-2">
                      {errors.message
                        ? <p id="apply-message-error" role="alert" className="text-xs text-destructive">{errors.message}</p>
                        : <span />}
                      <p className="shrink-0 text-xs text-muted-foreground">{form.message.length}/3000</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="md:col-span-2 rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.01]"
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FilterGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
}) {
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
