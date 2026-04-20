import dotenv from "dotenv";

dotenv.config();

// Infrastructure config: central place for environment variables.
export const env = {
  // Use a dedicated variable to avoid clashes with frontend/default PORT values.
  port: Number(process.env.BACKEND_PORT ?? 4000),
  restCountriesBaseUrl:
    process.env.REST_COUNTRIES_BASE_URL ?? "https://restcountries.com/v3.1",
  sportsDbBaseUrl:
    process.env.SPORTS_DB_BASE_URL ?? "https://www.thesportsdb.com/api/v1/json/123"
};
