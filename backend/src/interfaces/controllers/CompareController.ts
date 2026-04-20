import { Request, Response, NextFunction } from "express";
import { CompareCountriesUseCase } from "../../application/use-cases/CompareCountriesUseCase";
import { AppError } from "../../domain/errors/AppError";

// Interface controller: validates HTTP query params and delegates comparison.
export class CompareController {
  constructor(private readonly compareCountriesUseCase: CompareCountriesUseCase) {}

  compareCountries = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const firstCountry = String(request.query.c1 ?? "").trim();
      const secondCountry = String(request.query.c2 ?? "").trim();

      if (!firstCountry || !secondCountry) {
        throw new AppError('Query params "c1" and "c2" are required.', 400);
      }

      const comparison = await this.compareCountriesUseCase.execute(
        firstCountry,
        secondCountry
      );

      response.status(200).json({
        success: true,
        data: comparison
      });
    } catch (error) {
      next(error);
    }
  };
}
