import { Country } from "../entities/Country";

// Repository contract: the application layer depends on this abstraction only.
export interface ICountryRepository {
  findAll(): Promise<Country[]>;
  findByName(name: string): Promise<Country | null>;
}
