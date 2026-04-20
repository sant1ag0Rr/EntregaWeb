import { ICountryRepository } from "../../domain/repositories/ICountryRepository";
import { CompareCountriesResult } from "../../domain/types/CompareCountriesResult";
import { AppError } from "../../domain/errors/AppError";

// Application layer: compares two countries without exposing repository details to HTTP.
export class CompareCountriesUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(firstName: string, secondName: string): Promise<CompareCountriesResult> {
    const [firstCountry, secondCountry] = await Promise.all([
      this.countryRepository.findByName(firstName),
      this.countryRepository.findByName(secondName)
    ]);

    if (!firstCountry || !secondCountry) {
      throw new AppError("Both countries must exist to compare them.", 404);
    }

    return {
      firstCountry,
      secondCountry
    };
  }
}
