"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CountryCard from "@/components/CountryCard";
import SearchBar from "@/components/SearchBar";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ComparisonPanel from "@/components/ComparisonPanel";
import useCountries from "@/hooks/useCountries";
import useFavorites from "@/hooks/useFavorites";
import { enrichCountries } from "@/utils/countryHelpers";

export default function ExplorerPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [comparisonSelection, setComparisonSelection] = useState([]);
  const [sortOrder, setSortOrder] = useState("name-asc");
  const [selectedWorldCups, setSelectedWorldCups] = useState("");
  const { countries, loading, error } = useCountries();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const q = searchParams.get("q");
    const region = searchParams.get("region");
    const sort = searchParams.get("sort");
    const wc = searchParams.get("wc");

    if (q !== null) setSearchTerm(q);
    if (region !== null) setSelectedRegion(region);
    if (sort === "name-asc" || sort === "name-desc") setSortOrder(sort);
    if (wc !== null) setSelectedWorldCups(wc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("q", searchTerm.trim());
    if (selectedRegion) params.set("region", selectedRegion);
    if (sortOrder !== "name-asc") params.set("sort", sortOrder);
    if (selectedWorldCups) params.set("wc", selectedWorldCups);

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
        scroll: false
      });
    }
  }, [
    pathname,
    router,
    searchParams,
    searchTerm,
    selectedRegion,
    sortOrder,
    selectedWorldCups
  ]);

  const enrichedCountries = useMemo(() => enrichCountries(countries), [countries]);

  const favoriteCountries = useMemo(() => {
    return enrichedCountries.filter((country) => favorites.includes(country.name.common));
  }, [enrichedCountries, favorites]);

  const filteredCountries = useMemo(() => {
    let filtered = enrichedCountries
      .filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((country) =>
        selectedRegion === "" || country.region === selectedRegion
      )
      .filter((country) =>
        selectedWorldCups === "" || (country.footballInfo && country.footballInfo.worldCups === parseInt(selectedWorldCups))
      );

    // Ordenar los países
    filtered.sort((a, b) => {
      if (sortOrder === "name-asc") {
        return a.name.common.localeCompare(b.name.common);
      } else if (sortOrder === "name-desc") {
        return b.name.common.localeCompare(a.name.common);
      }
      return 0;
    });

    return filtered;
  }, [enrichedCountries, searchTerm, selectedRegion, sortOrder, selectedWorldCups]);

  const regions = useMemo(() => {
    const uniqueRegions = [...new Set(enrichedCountries.map(country => country.region))];
    return uniqueRegions.sort();
  }, [enrichedCountries]);

  const comparedCountries = useMemo(() => {
    return enrichedCountries.filter((country) =>
      comparisonSelection.includes(country.name.common)
    );
  }, [comparisonSelection, enrichedCountries]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedRegion("");
    setSortOrder("name-asc");
    setSelectedWorldCups("");
    router.replace(pathname, { scroll: false });
  }

  function toggleCompare(countryName) {
    setComparisonSelection((currentSelection) => {
      if (currentSelection.includes(countryName)) {
        return currentSelection.filter((item) => item !== countryName);
      }

      if (currentSelection.length >= 2) {
        return currentSelection;
      }

      return [...currentSelection, countryName];
    });
  }

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-panel">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
              Explorer FIFA
            </span>
            <h1 className="text-3xl font-black text-white">Buscador de paises</h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Consulta informacion oficial de cada pais y complementala con un contexto futbolistico local para enriquecer la experiencia del usuario.
            </p>
          </div>

          <div className="w-full max-w-xl space-y-4">
            <div className="flex gap-4">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="rounded-lg border border-white/15 bg-slate-800 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="">Todos los continentes</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-lg border border-white/15 bg-slate-800 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="name-asc">Nombre A-Z</option>
                <option value="name-desc">Nombre Z-A</option>
              </select>
              <select
                value={selectedWorldCups}
                onChange={(e) => setSelectedWorldCups(e.target.value)}
                className="rounded-lg border border-white/15 bg-slate-800 px-4 py-2 text-white focus:border-emerald-400 focus:outline-none"
              >
                <option value="">Todos los mundiales</option>
                <option value="1">1 Mundial</option>
                <option value="2">2 Mundiales</option>
                <option value="3">3 Mundiales</option>
                <option value="4">4 Mundiales</option>
                <option value="5">5 Mundiales</option>
              </select>
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-lg border border-white/15 bg-slate-950/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Limpiar
              </button>
            </div>
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Paises cargados
          </p>
          <p className="mt-2 text-3xl font-black text-white">{enrichedCountries.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Favoritos guardados
          </p>
          <p className="mt-2 text-3xl font-black text-white">{favoriteCountries.length}</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Cupos para comparar
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {comparisonSelection.length}/2
          </p>
        </div>
      </div>

      {favoriteCountries.length > 0 ? (
        <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            Favoritos
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {favoriteCountries.map((country) => (
              <span
                key={country.name.common}
                className="rounded-full border border-white/10 bg-slate-950/40 px-4 py-2 text-sm text-white"
              >
                {country.name.common}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <ComparisonPanel countries={comparedCountries} onRemove={toggleCompare} />

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6 text-sm text-rose-100">
          {error}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-1">
            <p className="text-sm text-slate-300">
              Resultados encontrados:{" "}
              <span className="font-semibold text-white">{filteredCountries.length}</span>
            </p>
          </div>

          {filteredCountries.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-sm text-slate-300">
              No se encontraron paises con el criterio de busqueda actual.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCountries.map((country) => (
                <CountryCard
                  key={country.name.common}
                  country={country}
                  isFavorite={isFavorite(country.name.common)}
                  onToggleFavorite={toggleFavorite}
                  isSelectedForComparison={comparisonSelection.includes(
                    country.name.common
                  )}
                  onToggleCompare={toggleCompare}
                  comparisonDisabled={
                    comparisonSelection.length >= 2 &&
                    !comparisonSelection.includes(country.name.common)
                  }
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
