import cors from "cors";
import express from "express";
import { GetCountriesUseCase } from "./application/use-cases/GetCountriesUseCase";
import { GetCountryByNameUseCase } from "./application/use-cases/GetCountryByNameUseCase";
import { GetTeamsByCountryUseCase } from "./application/use-cases/GetTeamsByCountryUseCase";
import { CompareCountriesUseCase } from "./application/use-cases/CompareCountriesUseCase";
import { CreateUserUseCase } from "./application/use-cases/CreateUserUseCase";
import { DeleteUserUseCase } from "./application/use-cases/DeleteUserUseCase";
import { RestCountriesClient } from "./infrastructure/http/RestCountriesClient";
import { SportsDbClient } from "./infrastructure/http/SportsDbClient";
import { GetUserByIdUseCase } from "./application/use-cases/GetUserByIdUseCase";
import { GetUsersUseCase } from "./application/use-cases/GetUsersUseCase";
import { UpdateUserUseCase } from "./application/use-cases/UpdateUserUseCase";
import { CountryRepository } from "./infrastructure/repositories/CountryRepository";
import { InMemoryUserRepository } from "./infrastructure/repositories/InMemoryUserRepository";
import { TeamRepository } from "./infrastructure/repositories/TeamRepository";
import { CountryController } from "./interfaces/controllers/CountryController";
import { TeamController } from "./interfaces/controllers/TeamController";
import { CompareController } from "./interfaces/controllers/CompareController";
import { UserController } from "./interfaces/controllers/UserController";
import { buildRoutes } from "./interfaces/routes";
import { errorHandler, notFoundHandler } from "./interfaces/middleware/errorHandlers";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const restCountriesClient = new RestCountriesClient();
  const sportsDbClient = new SportsDbClient();

  const countryRepository = new CountryRepository(restCountriesClient);
  const teamRepository = new TeamRepository(sportsDbClient);
  const userRepository = new InMemoryUserRepository();

  const getCountriesUseCase = new GetCountriesUseCase(countryRepository);
  const getCountryByNameUseCase = new GetCountryByNameUseCase(countryRepository);
  const getTeamsByCountryUseCase = new GetTeamsByCountryUseCase(teamRepository);
  const compareCountriesUseCase = new CompareCountriesUseCase(countryRepository);
  const getUsersUseCase = new GetUsersUseCase(userRepository);
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const updateUserUseCase = new UpdateUserUseCase(userRepository);
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);

  const countryController = new CountryController(
    getCountriesUseCase,
    getCountryByNameUseCase
  );
  const teamController = new TeamController(getTeamsByCountryUseCase);
  const compareController = new CompareController(compareCountriesUseCase);
  const userController = new UserController(
    getUsersUseCase,
    getUserByIdUseCase,
    createUserUseCase,
    updateUserUseCase,
    deleteUserUseCase
  );

  app.use(
    "/api",
    buildRoutes({
      countryController,
      teamController,
      compareController,
      userController
    })
  );

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
