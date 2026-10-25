"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { X, Menu } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Catalogs", href: "/catalogs" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuAnimation, setMenuAnimation] = React.useState<"enter" | "exit" | "idle">("idle");
  const menuRef = React.useRef<HTMLDivElement>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    if (mobileOpen) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setMenuAnimation("enter");

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          closeMenu();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      menuRef.current?.focus();

      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      setMenuAnimation("exit");
      const timer = setTimeout(() => {
        document.body.style.overflow = "";
        lastFocusedRef.current?.focus();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [mobileOpen]);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}

      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex h-14 sm:h-16 items-center justify-center gap-8">
          {/* Logo - Centered */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center gap-2 font-semibold text-lg sm:text-xl text-foreground transition-colors hover:text-primary"
            aria-label="Madhav Offset Printers - Home"
          >
            <svg
              className="h-6 w-6 sm:h-7 sm:w-7 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h8m-8-4h.01M17 17V9a2 2 0 00-2-2H5a2 2 0 00-2 2v8"
              />
            </svg>
            <span className="hidden sm:inline">Madhav Offset Printers</span>
            <span className="sm:hidden">Madhav</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  pathname === item.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 active:bg-primary transition-colors touch-target interactive"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors touch-target interactive"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="relative h-6 w-6 transition-transform duration-300 ease-in-out" aria-hidden="true">
              {mobileOpen ? (
                <X className="h-6 w-6 animate-in rotate-in duration-200" />
              ) : (
                <Menu className="h-6 w-6 animate-in rotate-in duration-200" />
              )}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div
            ref={menuRef}
            id="mobile-menu"
            className="md:hidden py-4 border-t border-border"
            role="navigation"
            aria-label="Mobile navigation"
            tabIndex={-1}
          >
            <div
              className={cn(
                "flex flex-col gap-1 animate-in duration-300 ease-out",
                menuAnimation === "enter" && "slide-in-from-top-2",
                menuAnimation === "exit" && "slide-out-to-top-2"
              )}
            >
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-3 text-base font-medium rounded-md transition-colors touch-target interactive",
                    "animate-in fade-in slide-in-from-left-2 duration-300",
                    "duration-[calc(100ms+var(--index)*50ms)]",
                    pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                  style={{ "--index": index } as React.CSSProperties}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className={cn(
                  "mt-2 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-primary rounded-md hover:bg-primary/90 active:bg-primary transition-colors touch-target interactive",
                  "animate-in fade-in slide-in-from-left-2 duration-300",
                  "duration-[calc(100ms+var(--index)*50ms)]"
                )}
                style={{ "--index": navigation.length } as React.CSSProperties}
                onClick={handleLinkClick}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Global styles for mobile menu animations */}
      <style jsx>{`
        @keyframes slide-in-from-top-2 {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-out-to-top-2 {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-8px);
          }
        }
        @keyframes slide-in-from-left-2 {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes rotate-in {
          from {
            opacity: 0;
            transform: rotate(-90deg) scale(0.8);
          }
          to {
            opacity: 1;
            transform: rotate(0) scale(1);
          }
        }
      `}</style>
    </header>
  );
}