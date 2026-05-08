import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Mail, Phone, Globe, Instagram, Linkedin, Facebook } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — XNOVA" },
      { name: "description", content: "Get in touch with XNOVA. Let's build smarter solutions together." },
      { property: "og:title", content: "Contact — XNOVA" },
      { property: "og:description", content: "Reach out for partnerships, projects or general inquiries." },
    ],
  }),
  component: ContactPage,
});

// Simple sanitiser — strips HTML tags to prevent XSS if value is ever rendered as HTML
function sanitize(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Naive client-side rate limit: max 3 submissions per 10 minutes
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const submissionTimestamps: number[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove timestamps outside the window
  while (submissionTimestamps.length && submissionTimestamps[0] < now - RATE_WINDOW_MS) {
    submissionTimestamps.shift();
  }
  return submissionTimestamps.length >= RATE_LIMIT;
}

function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    const name = sanitize(form.name);
    const email = sanitize(form.email);
    const message = sanitize(form.message);

    if (!name) errs.name = "Name is required.";
    else if (name.length < 2) errs.name = "Name must be at least 2 characters.";
    else if (name.length > 100) errs.name = "Name must be under 100 characters.";

    if (!email) errs.email = "Email is required.";
    else if (!validateEmail(email)) errs.email = "Enter a valid email address.";
    else if (email.length > 254) errs.email = "Email address is too long.";

    if (!message) errs.message = "Message is required.";
    else if (message.length < 10) errs.message = "Message must be at least 10 characters.";
    else if (message.length > 2000) errs.message = "Message must be under 2000 characters.";

    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (isRateLimited()) {
      setRateLimited(true);
      return;
    }

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Record submission timestamp
    submissionTimestamps.push(Date.now());

    // TODO: wire up to your backend / email service here
    console.info("Contact form submitted", {
      name: sanitize(form.name),
      email: sanitize(form.email),
      message: sanitize(form.message),
    });

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Let's build something <span className="text-gradient">remarkable</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Have a project in mind or want to explore a partnership? Send us a message — we typically reply within one business day.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-gradient-surface p-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Mail size={26} />
                </div>
                <h2 className="mt-5 text-xl font-bold">Message sent!</h2>
                <p className="mt-2 text-sm text-muted-foreground">Thanks for reaching out. We'll get back to you within one business day.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-lg border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl border border-border bg-gradient-surface p-6 sm:p-8 md:p-10"
              >
                {rateLimited && (
                  <div role="alert" className="mb-5 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Too many submissions. Please wait a few minutes before trying again.
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="text-sm font-medium">
                      Name <span aria-hidden="true" className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={100}
                      value={form.name}
                      onChange={handleChange}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      aria-invalid={!!errors.name}
                      placeholder="Jane Doe"
                      className={`mt-2 block w-full rounded-lg border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${errors.name ? "border-destructive" : "border-border"}`}
                    />
                    {errors.name && (
                      <p id="contact-name-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="text-sm font-medium">
                      Email <span aria-hidden="true" className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={form.email}
                      onChange={handleChange}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      aria-invalid={!!errors.email}
                      placeholder="jane@example.com"
                      className={`mt-2 block w-full rounded-lg border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${errors.email ? "border-destructive" : "border-border"}`}
                    />
                    {errors.email && (
                      <p id="contact-email-error" role="alert" className="mt-1.5 text-xs text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="contact-message" className="text-sm font-medium">
                    Message <span aria-hidden="true" className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    maxLength={2000}
                    value={form.message}
                    onChange={handleChange}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    aria-invalid={!!errors.message}
                    placeholder="Tell us about your project..."
                    className={`mt-2 block w-full rounded-lg border bg-surface px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary ${errors.message ? "border-destructive" : "border-border"}`}
                  />
                  <div className="mt-1 flex items-start justify-between gap-2">
                    {errors.message ? (
                      <p id="contact-message-error" role="alert" className="text-xs text-destructive">{errors.message}</p>
                    ) : <span />}
                    <p className="shrink-0 text-xs text-muted-foreground">{form.message.length}/2000</p>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.01] sm:w-auto"
                >
                  Send Message
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={150} className="lg:col-span-2">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-gradient-surface p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Reach us</h3>
                <ul className="mt-5 space-y-4 text-sm">
                  <li className="flex items-center gap-3"><Globe size={18} className="text-primary" /> XNova.tech</li>
                  <li className="flex items-center gap-3"><Mail size={18} className="text-primary" /> hello@xnova.tech</li>
                  <li className="flex items-center gap-3"><Phone size={18} className="text-primary" /> +1 (555) 010-2024</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-gradient-surface p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">Follow</h3>
                <div className="mt-5 flex gap-3">
                  {[
                    { Icon: Instagram, label: "Instagram", href: "#" },
                    { Icon: Linkedin, label: "LinkedIn", href: "#" },
                    { Icon: Facebook, label: "Facebook", href: "#" },
                    { Icon: Mail, label: "Email", href: "mailto:hello@xnova.tech" },
                  ].map(({ Icon, label, href }) => (
                    <a key={label} href={href} aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}
