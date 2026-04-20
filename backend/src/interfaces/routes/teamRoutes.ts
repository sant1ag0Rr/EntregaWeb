import { Router } from "express";
import { TeamController } from "../controllers/TeamController";

// Interface routes: bind team endpoints to the team controller.
export function buildTeamRoutes(teamController: TeamController) {
  const router = Router();

  router.get("/:country", teamController.getTeamsByCountry);

  return router;
}
