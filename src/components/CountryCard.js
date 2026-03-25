"use client";

import Link from "next/link";
import useFootballTeams from "@/hooks/useFootballTeams";

function getCurrencyLabel(currencies) {
  if (!currencies) {
    return "No disponible";
  }

  const [firstCurrency] = Object.values(currencies);

  if (!firstCurrency) {
    return "No disponible";
  }

  return `${firstCurrency.name} (${firstCurrency.symbol ?? "N/A"})`;
}

export default function CountryCard({
  country,
  isFavorite = false,
  onToggleFavorite = () => {},
  isSelectedForComparison = false,
  onToggleCompare = () => {},
  comparisonDisabled = false
}) {
  const footballInfo = country.footballInfo;
  const { teams, loading } = useFootballTeams(country.name.common);
  const latlng = country.latlng?.length
    ? `${country.latlng[0]}, ${country.latlng[1]}`
    : "No disponible";

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30">
      <div className="flex items-start justify-between gap-4 border-b border-white/10 bg-white/5 p-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
            {country.capital?.[0] ?? "Capital no disponible"}
          </p>
          <h2 className="text-2xl font-black text-white">{country.name.common}</h2>
        </div>
        <img
          src={country.flags.svg}
          alt={`Bandera de ${country.name.common}`}
          className="h-12 w-16 rounded-xl object-cover shadow-md"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onToggleFavorite(country.name.common)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              isFavorite
                ? "bg-amber-400 text-slate-950 hover:bg-amber-300"
                : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            }`}
          >
            {isFavorite ? "En favoritos" : "Agregar a favoritos"}
          </button>

          <button
            type="button"
            onClick={() => onToggleCompare(country.name.common)}
            disabled={comparisonDisabled && !isSelectedForComparison}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              isSelectedForComparison
                ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                : "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            }`}
          >
            {isSelectedForComparison ? "En comparador" : "Comparar"}
          </button>

          <Link
            href={`/explorer/${country.slug}`}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Ver detalle
          </Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <InfoPill label="Moneda" value={getCurrencyLabel(country.currencies)} />
          <InfoPill label="Coordenadas" value={latlng} />
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            Contexto futbolistico
          </p>
          <p className="mt-2 text-sm text-slate-100">
            Titulos mundiales:{" "}
            <span className="font-semibold">
              {footballInfo?.worldCups ?? 0}
            </span>
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {footballInfo?.relevance ??
              "Pais sin registro futbolistico local destacado en esta base academica."}
          </p>
        </div>

        {!loading && teams.length > 0 ? (
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Equipos destacados
            </p>
            <div className="mt-4 space-y-3">
              {teams.map((team) => (
                <div
                  key={team.idTeam}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/30 p-3"
                >
                  {team.strTeamBadge ? (
                    <img
                      src={team.strTeamBadge}
                      alt={`Escudo de ${team.strTeam}`}
                      className="h-12 w-12 rounded-full object-contain"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {team.strTeam}
                    </p>
                    <p className="truncate text-xs text-slate-300">
                      {team.strLeague}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-100">{value}</p>
    </div>
  );
}
