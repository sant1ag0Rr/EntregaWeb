import { Router } from "express";
import { CountryController } from "../controllers/CountryController";
import { TeamController } from "../controllers/TeamController";
import { CompareController } from "../controllers/CompareController";
import { UserController } from "../controllers/UserController";
import { buildCountryRoutes } from "./countryRoutes";
import { buildTeamRoutes } from "./teamRoutes";
import { buildCompareRoutes } from "./compareRoutes";
import { buildUserRoutes } from "./userRoutes";

interface RouteDependencies {
  countryController: CountryController;
  teamController: TeamController;
  compareController: CompareController;
  userController: UserController;
}

// Interface routes: aggregate all route modules in a single router.
export function buildRoutes({
  countryController,
  teamController,
  compareController,
  userController
}: RouteDependencies) {
  const router = Router();

  router.get("/health", (_request, response) => {
    response.status(200).json({
      success: true,
      message: "API is healthy"
    });
  });

  router.use("/countries", buildCountryRoutes(countryController));
  router.use("/teams", buildTeamRoutes(teamController));
  router.use("/compare", buildCompareRoutes(compareController));
  router.use("/users", buildUserRoutes(userController));

  return router;
}
