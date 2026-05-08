import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Facebook, Mail } from "lucide-react";
import logo from "../assets/xnova-white.png"; 

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 grid-cols-2 md:grid-cols-4">
        <div className="col-span-2 md:col-span-2">
                 <Link to="/" className="flex items-center gap-2">
        {/* Logo Image */}
        <img
          src={logo}
          alt="XNOVA Logo"
          className="h-8 w-auto object-contain"
        />

        {/* Brand Name */}
        {/* <span className="font-display text-xl font-bold tracking-tight">
          XNOVA
        </span> */}
      </Link>
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            Innovating smart solutions across technology, engineering and digital transformation.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "#", label: "Instagram" },
              { Icon: Linkedin, href: "#", label: "LinkedIn" },
              { Icon: Facebook, href: "#", label: "Facebook" },
              { Icon: Mail, href: "mailto:hello@xnova.tech", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/projects" className="hover:text-primary">Projects</Link></li>
            <li><Link to="/careers" className="hover:text-primary">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>XNova.tech</li>
            <li>hello@xnova.tech</li>
            <li>+1 (555) 010-2024</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} XNOVA. All rights reserved.
      </div>
    </footer>
  );
}
