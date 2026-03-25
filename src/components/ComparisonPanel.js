"use client";

function getCurrencyLabel(currencies) {
  if (!currencies) {
    return "No disponible";
  }

  const [firstCurrency] = Object.values(currencies);
  return firstCurrency
    ? `${firstCurrency.name} (${firstCurrency.symbol ?? "N/A"})`
    : "No disponible";
}

function DetailRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default function ComparisonPanel({ countries, onRemove }) {
  if (countries.length === 0) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            Comparador de paises
          </p>
          <h2 className="mt-1 text-2xl font-black text-white">
            Analiza hasta dos selecciones culturales
          </h2>
        </div>
        <p className="text-sm text-slate-300">
          Seleccionados: <span className="font-semibold text-white">{countries.length}/2</span>
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {countries.map((country) => (
          <article
            key={country.name.common}
            className="rounded-3xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  {country.capital?.[0] ?? "Capital no disponible"}
                </p>
                <h3 className="mt-1 text-2xl font-black text-white">
                  {country.name.common}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onRemove(country.name.common)}
                className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Quitar
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <DetailRow label="Moneda" value={getCurrencyLabel(country.currencies)} />
              <DetailRow
                label="Coordenadas"
                value={
                  country.latlng?.length
                    ? `${country.latlng[0]}, ${country.latlng[1]}`
                    : "No disponible"
                }
              />
              <DetailRow
                label="Titulos mundiales"
                value={String(country.footballInfo?.worldCups ?? 0)}
              />
              <DetailRow
                label="Relevancia"
                value={
                  country.footballInfo?.relevance ??
                  "Sin registro destacado en la base academica."
                }
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
