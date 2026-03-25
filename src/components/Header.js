import Link from "next/link";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/explorer", label: "Explorer" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 font-black text-slate-950">
            F
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
              FIFA Hub
            </p>
            <p className="text-sm text-slate-300">World Culture Dashboard</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
