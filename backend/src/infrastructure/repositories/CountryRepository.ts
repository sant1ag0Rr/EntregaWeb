import footballData from "../data/footballData.json";
import { fallbackCountries } from "../data/fallbackCountries";
import { Country } from "../../domain/entities/Country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";
import { RestCountriesClient } from "../http/RestCountriesClient";

interface FootballInfo {
  country: string;
  worldCups: number;
  relevance: string;
}

// Infrastructure repository: merges external country data with local football data.
export class CountryRepository implements ICountryRepository {
  constructor(private readonly restCountriesClient: RestCountriesClient) {}

  async findAll(): Promise<Country[]> {
    try {
      const countries = await this.restCountriesClient.fetchCountries();
      return countries
        .map((country) => this.normalizeCountry(country))
        .sort((a, b) => a.name.localeCompare(b.name));
    } catch {
      return [...fallbackCountries].sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  async findByName(name: string): Promise<Country | null> {
    const countries = await this.findAll();
    const normalizedName = this.normalizeText(name);

    return (
      countries.find((country) => this.normalizeText(country.name) === normalizedName) ??
      null
    );
  }

  private normalizeCountry(rawCountry: {
    name?: { common?: string };
    capital?: string[];
    currencies?: Record<string, { name?: string; symbol?: string }>;
    flags?: { svg?: string; png?: string };
    latlng?: number[];
  }): Country {
    const name = rawCountry.name?.common ?? "Unknown";
    const footballInfo = this.getFootballInfo(name);

    return {
      name,
      capital: rawCountry.capital?.[0] ?? "Unknown",
      currency: this.getCurrencyLabel(rawCountry.currencies),
      flag: rawCountry.flags?.svg ?? rawCountry.flags?.png ?? "",
      latlng:
        rawCountry.latlng && rawCountry.latlng.length >= 2
          ? [rawCountry.latlng[0], rawCountry.latlng[1]]
          : [],
      fifaWorldCups: footballInfo?.worldCups,
      description: footballInfo?.relevance
    };
  }

  private getCurrencyLabel(
    currencies?: Record<string, { name?: string; symbol?: string }>
  ): string {
    if (!currencies) {
      return "Unknown";
    }

    const firstCurrency = Object.values(currencies)[0];

    if (!firstCurrency?.name) {
      return "Unknown";
    }

    return `${firstCurrency.name} (${firstCurrency.symbol ?? "N/A"})`;
  }

  private getFootballInfo(countryName: string): FootballInfo | undefined {
    return (footballData as FootballInfo[]).find(
      (item) => this.normalizeText(item.country) === this.normalizeText(countryName)
    );
  }

  private normalizeText(value: string): string {
    return value.trim().toLowerCase();
  }
}
