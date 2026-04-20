import Link from "next/link";

const teamMembers = [
  "Santiago Rodriguez",
  "Victor Monsalve",
  "Matias Herrera"
];

const highlights = [
  "Explora paises con datos oficiales en tiempo real.",
  "Relaciona cultura general con contexto futbolistico FIFA.",
  "Consulta informacion clave de forma clara y responsive."
];

export default function HomePage() {
  return (
    <section className="space-y-10">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-panel backdrop-blur">
        <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-sm font-medium text-amber-200">
              Next.js + TailwindCSS + Rest Countries API
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                FIFA World Culture Hub
              </h1>
              <p className="max-w-2xl text-lg text-slate-300">
                Una mini aplicacion academica que conecta informacion geopolitica de cada pais con su impacto cultural y su historia dentro del futbol mundial.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/explorer"
                className="rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Explorar paises
              </Link>
              <a
                href="https://restcountries.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ver API utilizada
              </a>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            {highlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-4 text-sm text-slate-200"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
          <h2 className="text-xl font-bold text-white">Descripcion del proyecto</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            La plataforma presenta nombre, bandera, capital, moneda y coordenadas de diferentes paises, sumando una capa futbolistica con datos locales como titulos mundiales y relevancia historica.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
          <h2 className="text-xl font-bold text-white">Problema que resuelve</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Durante torneos internacionales, muchas personas conocen la seleccion de un pais pero no su contexto general. Esta app centraliza informacion tecnica, geografica y deportiva en una sola experiencia.
          </p>
        </article>

        <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
          <h2 className="text-xl font-bold text-white">Integrantes del equipo</h2>
          <ul className="mt-3 space-y-3 text-sm text-slate-300">
            {teamMembers.map((member) => (
              <li
                key={member}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {member}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
