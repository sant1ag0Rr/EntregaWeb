import axios from "axios";
import { env } from "../config/env";

interface SportsDbResponseDto {
  teams?: Array<{
    idTeam?: string;
    strTeam?: string;
    strLeague?: string;
    strTeamBadge?: string;
  }>;
}

// Infrastructure HTTP client: isolates the details of TheSportsDB API.
export class SportsDbClient {
  async fetchTeamsByCountry(country: string): Promise<SportsDbResponseDto> {
    const response = await axios.get<SportsDbResponseDto>(
      `${env.sportsDbBaseUrl}/search_all_teams.php`,
      {
        params: {
          s: "Soccer",
          c: country
        },
        timeout: 8000
      }
    );

    return response.data;
  }
}
