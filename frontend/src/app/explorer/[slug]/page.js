"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import useCountries from "@/hooks/useCountries";
import useFootballTeams from "@/hooks/useFootballTeams";
import { enrichCountries } from "@/utils/countryHelpers";

function getCurrencyLabel(currencies) {
  if (!currencies) {
    return "No disponible";
  }

  const [firstCurrency] = Object.values(currencies);
  return firstCurrency
    ? `${firstCurrency.name} (${firstCurrency.symbol ?? "N/A"})`
    : "No disponible";
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default function CountryDetailPage() {
  const params = useParams();
  const { countries, loading, error } = useCountries();
  const enrichedCountries = useMemo(() => enrichCountries(countries), [countries]);
  const country = useMemo(
    () => enrichedCountries.find((item) => item.slug === params?.slug),
    [enrichedCountries, params]
  );
  const { teams, loading: teamsLoading } = useFootballTeams(country?.name.common ?? "");

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-sm text-rose-100">
        {error}
      </div>
    );
  }

  if (!country) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center shadow-panel">
        <h1 className="text-2xl font-black text-white">Pais no encontrado</h1>
        <p className="mt-3 text-sm text-slate-300">
          No pudimos encontrar el pais solicitado en la lista actual.
        </p>
        <Link
          href="/explorer"
          className="mt-5 inline-flex rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Volver al explorer
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/explorer"
              className="text-sm font-medium text-emerald-200 transition hover:text-emerald-100"
            >
              Volver al explorer
            </Link>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Ficha de pais
            </p>
            <h1 className="mt-1 text-4xl font-black text-white">
              {country.name.common}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Vista detallada con informacion geografica y contexto futbolistico para profundizar la exploracion cultural del proyecto.
            </p>
          </div>
          <img
            src={country.flags.svg}
            alt={`Bandera de ${country.name.common}`}
            className="h-24 w-36 rounded-2xl object-cover shadow-md"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Capital" value={country.capital?.[0] ?? "No disponible"} />
        <StatCard label="Moneda" value={getCurrencyLabel(country.currencies)} />
        <StatCard
          label="Coordenadas"
          value={
            country.latlng?.length
              ? `${country.latlng[0]}, ${country.latlng[1]}`
              : "No disponible"
          }
        />
        <StatCard
          label="Titulos mundiales"
          value={String(country.footballInfo?.worldCups ?? 0)}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            Relevancia futbolistica
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            {country.footballInfo?.relevance ??
              "Este pais no tiene un resumen futbolistico local ampliado dentro de la base academica actual, pero sigue disponible para consulta cultural y geografica."}
          </p>
        </article>

        {!teamsLoading && teams.length > 0 ? (
          <article className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6 shadow-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Equipos de futbol
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
                    <p className="truncate text-xs text-slate-300">{team.strLeague}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ) : null}
      </div>
    </section>
  );
}
