import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../application/use-cases/CreateUserUseCase";
import { DeleteUserUseCase } from "../../application/use-cases/DeleteUserUseCase";
import { GetUserByIdUseCase } from "../../application/use-cases/GetUserByIdUseCase";
import { GetUsersUseCase } from "../../application/use-cases/GetUsersUseCase";
import { UpdateUserUseCase } from "../../application/use-cases/UpdateUserUseCase";

function getSingleParam(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export class UserController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  getUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const email =
        typeof request.query.email === "string" ? request.query.email : undefined;
      const users = await this.getUsersUseCase.execute({ email });

      response.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = getSingleParam(request.params.id);
      const user = await this.getUserByIdUseCase.execute(userId);

      response.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await this.createUserUseCase.execute({
        name: String(request.body?.name ?? ""),
        email: String(request.body?.email ?? "")
      });

      response.status(201).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await this.updateUserUseCase.execute({
        id: getSingleParam(request.params.id),
        name: String(request.body?.name ?? ""),
        email: String(request.body?.email ?? "")
      });

      response.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = getSingleParam(request.params.id);
      await this.deleteUserUseCase.execute(userId);

      response.status(200).json({
        success: true,
        data: {
          id: userId
        }
      });
    } catch (error) {
      next(error);
    }
  };
}
