import { Request, Response, NextFunction } from "express";
import { GetCountriesUseCase } from "../../application/use-cases/GetCountriesUseCase";
import { GetCountryByNameUseCase } from "../../application/use-cases/GetCountryByNameUseCase";

function getSingleParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

// Interface controller: translates HTTP input/output without business logic.
export class CountryController {
  constructor(
    private readonly getCountriesUseCase: GetCountriesUseCase,
    private readonly getCountryByNameUseCase: GetCountryByNameUseCase
  ) {}

  getCountries = async (_request: Request, response: Response, next: NextFunction) => {
    try {
      const countries = await this.getCountriesUseCase.execute();
      response.status(200).json({
        success: true,
        data: countries
      });
    } catch (error) {
      next(error);
    }
  };

  getCountryByName = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const countryName = getSingleParam(request.params.name);
      const country = await this.getCountryByNameUseCase.execute(countryName);
      response.status(200).json({
        success: true,
        data: country
      });
    } catch (error) {
      next(error);
    }
  };
}
