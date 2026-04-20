import { Country } from "../../domain/entities/Country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";

// Application layer: orchestrates the request to fetch every country.
export class GetCountriesUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(): Promise<Country[]> {
    return this.countryRepository.findAll();
  }
}
