import { Country } from "../../domain/entities/Country";
import { ICountryRepository } from "../../domain/repositories/ICountryRepository";
import { AppError } from "../../domain/errors/AppError";

// Application layer: fetches one country and applies business-level errors.
export class GetCountryByNameUseCase {
  constructor(private readonly countryRepository: ICountryRepository) {}

  async execute(name: string): Promise<Country> {
    const country = await this.countryRepository.findByName(name);

    if (!country) {
      throw new AppError(`Country "${name}" not found.`, 404);
    }

    return country;
  }
}
