import { Request, Response, NextFunction } from "express";
import { GetTeamsByCountryUseCase } from "../../application/use-cases/GetTeamsByCountryUseCase";

function getSingleParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

// Interface controller: reads the country parameter and returns teams.
export class TeamController {
  constructor(private readonly getTeamsByCountryUseCase: GetTeamsByCountryUseCase) {}

  getTeamsByCountry = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const countryName = getSingleParam(request.params.country);
      const teams = await this.getTeamsByCountryUseCase.execute(countryName);
      response.status(200).json({
        success: true,
        data: teams
      });
    } catch (error) {
      next(error);
    }
  };
}
