import { Router } from "express";
import { UserController } from "../controllers/UserController";

export function buildUserRoutes(userController: UserController) {
  const router = Router();

  router.get("/", userController.getUsers);
  router.get("/:id", userController.getUserById);
  router.post("/", userController.createUser);
  router.put("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUser);

  return router;
}
