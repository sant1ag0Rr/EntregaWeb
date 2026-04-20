import axios from "axios";
import { env } from "../config/env";

interface RestCountriesCountryDto {
  name?: { common?: string };
  capital?: string[];
  currencies?: Record<string, { name?: string; symbol?: string }>;
  flags?: { svg?: string; png?: string };
  latlng?: number[];
}

// Infrastructure HTTP client: isolates the details of the Rest Countries API.
export class RestCountriesClient {
  async fetchCountries(): Promise<RestCountriesCountryDto[]> {
    const response = await axios.get<RestCountriesCountryDto[]>(
      `${env.restCountriesBaseUrl}/all?fields=name,capital,currencies,flags,latlng`,
      {
        timeout: 8000
      }
    );

    return response.data;
  }
}
