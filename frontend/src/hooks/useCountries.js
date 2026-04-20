"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,latlng,region";

export default function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchCountries() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("No fue posible obtener la informacion de los paises.");
        }

        const data = await response.json();

        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        if (isMounted) {
          setCountries(sortedCountries);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(
            fetchError.message ||
              "Ocurrio un error inesperado al consultar la API."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCountries();

    return () => {
      isMounted = false;
    };
  }, []);

  return { countries, loading, error };
}
