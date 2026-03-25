"use client";

import { useEffect, useState } from "react";

const footballTeamsCache = new Map();

export default function useFootballTeams(country) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!country) {
      setTeams([]);
      setLoading(false);
      setError("");
      return;
    }

    const normalizedCountry = country.trim().toLowerCase();

    if (footballTeamsCache.has(normalizedCountry)) {
      setTeams(footballTeamsCache.get(normalizedCountry));
      setLoading(false);
      setError("");
      return;
    }

    const controller = new AbortController();

    async function fetchTeams() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.thesportsdb.com/api/v1/json/123/search_all_teams.php?s=Soccer&c=${encodeURIComponent(
            country
          )}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("No fue posible consultar los equipos de futbol.");
        }

        const data = await response.json();
        const nextTeams = Array.isArray(data?.teams) ? data.teams.slice(0, 5) : [];

        footballTeamsCache.set(normalizedCountry, nextTeams);
        setTeams(nextTeams);
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          return;
        }

        setError(
          fetchError.message ||
            "Ocurrio un error inesperado al consultar los equipos."
        );
        setTeams([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchTeams();

    return () => {
      controller.abort();
    };
  }, [country]);

  return { teams, loading, error };
}
