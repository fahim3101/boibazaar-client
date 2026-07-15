"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const privateLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/items/add", label: "Sell a Book" },
    { href: "/items/manage", label: "My Listings" },
    { href: "/about", label: "About" },
    ...(user?.role === "admin" ? [{ href: "/admin", label: "Admin Panel" }] : []),
  ];

  const links = user ? privateLinks : publicLinks;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 w-full bg-ink text-paper shadow-card">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="stamp-badge border-amber text-amber">BB</span>
          BoiBazaar
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber ${
                isActive(link.href) ? "text-amber" : "text-paper/90"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="flex items-center gap-2 font-mono text-xs text-paper/70">
                {user.photoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.photoUrl} alt={user.name} className="h-6 w-6 rounded-full" />
                )}
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="rounded-card border border-amber px-4 py-1.5 text-sm font-medium text-amber transition-colors hover:bg-amber hover:text-ink"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-paper/90 hover:text-amber"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-card bg-amber px-4 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-amber-dark"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="h-0.5 w-6 bg-paper" />
          <span className="h-0.5 w-6 bg-paper" />
          <span className="h-0.5 w-6 bg-paper" />
        </button>
      </div>

      {open && (
        <div className="border-t border-paper/10 bg-ink px-5 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium ${isActive(link.href) ? "text-amber" : "text-paper/90"}`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <button onClick={logout} className="text-left text-sm font-medium text-amber">
                Log out ({user.name.split(" ")[0]})
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-paper/90">
                  Log in
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="text-sm font-semibold text-amber">
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
