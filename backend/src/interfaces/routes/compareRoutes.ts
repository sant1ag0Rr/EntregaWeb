import { Router } from "express";
import { CompareController } from "../controllers/CompareController";

// Interface routes: expose the compare endpoint for the frontend.
export function buildCompareRoutes(compareController: CompareController) {
  const router = Router();

  router.get("/", compareController.compareCountries);

  return router;
}
