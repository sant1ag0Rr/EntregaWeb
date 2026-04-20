"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "fifa-world-culture-favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);

      if (!storedValue) {
        return;
      }

      const parsedFavorites = JSON.parse(storedValue);

      if (Array.isArray(parsedFavorites)) {
        setFavorites(parsedFavorites);
      }
    } catch {
      setFavorites([]);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, isReady]);

  function toggleFavorite(countryName) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(countryName)
        ? currentFavorites.filter((item) => item !== countryName)
        : [...currentFavorites, countryName]
    );
  }

  function isFavorite(countryName) {
    return favorites.includes(countryName);
  }

  return { favorites, toggleFavorite, isFavorite };
}
