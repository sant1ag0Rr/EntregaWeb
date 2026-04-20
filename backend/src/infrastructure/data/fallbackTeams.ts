import { Team } from "../../domain/entities/Team";

// Infrastructure fallback: lightweight in-memory teams by country.
export const fallbackTeamsByCountry: Record<string, Team[]> = {
  argentina: [
    {
      id: "fallback-boc",
      name: "Boca Juniors",
      league: "Liga Profesional Argentina",
      badge: "https://www.thesportsdb.com/images/media/team/badge/xzwwtp1421431868.png"
    },
    {
      id: "fallback-riv",
      name: "River Plate",
      league: "Liga Profesional Argentina",
      badge: "https://www.thesportsdb.com/images/media/team/badge/stqvry1421434935.png"
    }
  ],
  brazil: [
    {
      id: "fallback-fla",
      name: "Flamengo",
      league: "Serie A",
      badge: "https://www.thesportsdb.com/images/media/team/badge/xxywtr1421431953.png"
    },
    {
      id: "fallback-pal",
      name: "Palmeiras",
      league: "Serie A",
      badge: "https://www.thesportsdb.com/images/media/team/badge/xttyr1421431856.png"
    }
  ],
  france: [
    {
      id: "fallback-psg",
      name: "Paris Saint-Germain",
      league: "Ligue 1",
      badge: "https://www.thesportsdb.com/images/media/team/badge/xxyvst1421431999.png"
    }
  ],
  japan: [
    {
      id: "fallback-ura",
      name: "Urawa Red Diamonds",
      league: "J1 League",
      badge: "https://www.thesportsdb.com/images/media/team/badge/yvuwtu1448813215.png"
    }
  ]
};
