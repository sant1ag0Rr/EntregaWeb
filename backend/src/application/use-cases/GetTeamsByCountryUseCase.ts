import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";

// Application layer: delegates the search for teams by country.
export class GetTeamsByCountryUseCase {
  constructor(private readonly teamRepository: ITeamRepository) {}

  async execute(country: string): Promise<Team[]> {
    return this.teamRepository.findByCountry(country);
  }
}
