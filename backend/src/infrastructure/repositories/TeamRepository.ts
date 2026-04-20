import { Team } from "../../domain/entities/Team";
import { ITeamRepository } from "../../domain/repositories/ITeamRepository";
import { SportsDbClient } from "../http/SportsDbClient";
import { fallbackTeamsByCountry } from "../data/fallbackTeams";

// Infrastructure repository: adapts TheSportsDB output into the Team entity.
export class TeamRepository implements ITeamRepository {
  constructor(private readonly sportsDbClient: SportsDbClient) {}

  async findByCountry(country: string): Promise<Team[]> {
    const normalizedCountry = country.trim().toLowerCase();

    try {
      const response = await this.sportsDbClient.fetchTeamsByCountry(country);
      const teams = Array.isArray(response.teams) ? response.teams : [];

      if (teams.length === 0) {
        return fallbackTeamsByCountry[normalizedCountry] ?? [];
      }

      return teams.slice(0, 5).map((team) => ({
        id: team.idTeam ?? "",
        name: team.strTeam ?? "Unknown team",
        league: team.strLeague ?? "Unknown league",
        badge: team.strTeamBadge
      }));
    } catch {
      return fallbackTeamsByCountry[normalizedCountry] ?? [];
    }
  }
}
