import { Country } from "../entities/Country";

// Domain type: response contract for country comparison.
export interface CompareCountriesResult {
  firstCountry: Country;
  secondCountry: Country;
}
