import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink-dark text-paper/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold text-paper">
            <span className="stamp-badge border-amber text-amber">BB</span>
            BoiBazaar
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/60">
            A student-to-student marketplace for secondhand textbooks and study
            materials across Bangladeshi universities.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-amber">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/explore" className="hover:text-amber">Browse books</Link></li>
            <li><Link href="/items/add" className="hover:text-amber">Sell a book</Link></li>
            <li><Link href="/items/manage" className="hover:text-amber">My listings</Link></li>
            <li><Link href="/register" className="hover:text-amber">Create account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-amber">
            Company
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-amber">About us</Link></li>
            <li><Link href="/contact" className="hover:text-amber">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-amber">Help &amp; FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-amber">
            Get in touch
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-paper/70">
            <li>fahimrana3101@gmail.com</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com/fahim3101"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp-badge border-paper/40 text-paper/70 hover:border-amber hover:text-amber"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/fahim-rana"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp-badge border-paper/40 text-paper/70 hover:border-amber hover:text-amber"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/10 py-5 text-center text-xs text-paper/50">
        © {new Date().getFullYear()} BoiBazaar. Built by MD Fahim Rana.
      </div>
    </footer>
  );
}
