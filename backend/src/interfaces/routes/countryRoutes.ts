import { Router } from "express";
import { CountryController } from "../controllers/CountryController";

// Interface routes: bind HTTP paths to country controller actions.
export function buildCountryRoutes(countryController: CountryController) {
  const router = Router();

  router.get("/", countryController.getCountries);
  router.get("/:name", countryController.getCountryByName);

  return router;
}
