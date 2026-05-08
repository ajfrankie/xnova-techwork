import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
// import { Link } from "react-router-dom";
import logo from "../assets/xnova-white.png"; // adjust path if needed

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  // { to: "/projects", label: "Projects" },
  { to: "/careers", label: "Careers" },
  // { to: "/research", label: "Research" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-card" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
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


        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-foreground" }}
              className="rounded-md px-4 py-2 text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-105 lg:inline-block"
        >
          Get in Touch
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-foreground lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="glass-strong border-t border-border lg:hidden">
          <nav className="flex flex-col p-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-primary" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-md px-4 py-3 text-sm font-medium"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
