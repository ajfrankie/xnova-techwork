import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { Mail, Phone, Globe, Instagram, Linkedin, Facebook } from "lucide-react";

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

function ContactPage() {
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
            <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl border border-border bg-gradient-surface p-6 sm:p-8 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input type="text" placeholder="Jane Doe" className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input type="email" placeholder="jane@example.com" className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                </div>
              </div>
              <div className="mt-5">
                <label className="text-sm font-medium">Message</label>
                <textarea rows={6} placeholder="Tell us about your project..." className="mt-2 block w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
              </div>
              <button className="mt-6 w-full rounded-lg bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.01] sm:w-auto">
                Send Message
              </button>
            </form>
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
