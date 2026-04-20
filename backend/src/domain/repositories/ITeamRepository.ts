import { Team } from "../entities/Team";

// Repository contract: use cases ask for teams without caring about the data source.
export interface ITeamRepository {
  findByCountry(country: string): Promise<Team[]>;
}
