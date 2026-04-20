import { Country } from "../../domain/entities/Country";

// Infrastructure fallback: used when external country APIs are unavailable.
export const fallbackCountries: Country[] = [
  {
    name: "Argentina",
    capital: "Buenos Aires",
    currency: "Argentine peso (ARS)",
    flag: "https://flagcdn.com/ar.svg",
    latlng: [-34, -64],
    fifaWorldCups: 3,
    description:
      "Seleccion historica con figuras como Maradona y Messi, campeona en 1978, 1986 y 2022."
  },
  {
    name: "Brazil",
    capital: "Brasilia",
    currency: "Brazilian real (R$)",
    flag: "https://flagcdn.com/br.svg",
    latlng: [-10, -55],
    fifaWorldCups: 5,
    description:
      "La seleccion mas laureada de los mundiales, reconocida por su futbol ofensivo y su legado global."
  },
  {
    name: "France",
    capital: "Paris",
    currency: "Euro (€)",
    flag: "https://flagcdn.com/fr.svg",
    latlng: [46, 2],
    fifaWorldCups: 2,
    description:
      "Seleccion moderna y talentosa, campeona en 1998 y 2018, protagonista constante en torneos recientes."
  },
  {
    name: "Japan",
    capital: "Tokyo",
    currency: "Japanese yen (JPY)",
    flag: "https://flagcdn.com/jp.svg",
    latlng: [36, 138],
    fifaWorldCups: 0,
    description:
      "Referencia asiatica por su desarrollo deportivo, disciplina y presencia constante en mundiales."
  }
];
