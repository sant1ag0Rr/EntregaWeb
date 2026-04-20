/**
 * INTERFACES - User Controller (HTTP)
 * 
 * El controlador maneja las peticiones HTTP y las respuestas.
 * Utiliza los casos de uso para ejecutar la lógica de negocio.
 * 
 * Flujo: Request HTTP -> Controller -> Casos de uso -> Repositorio -> Response
 */

import { Request, Response } from 'express';
import { GetAllUsersUseCase } from 'application/GetAllUsersUseCase';
import { GetUserByIdUseCase } from 'application/GetUserByIdUseCase';
import { CreateUserUseCase } from 'application/CreateUserUseCase';
import { UpdateUserUseCase } from 'application/UpdateUserUseCase';
import { DeleteUserUseCase } from 'application/DeleteUserUseCase';
import type { CreateUserDTO, UpdateUserDTO } from 'domain/User';

export class UserController {
  constructor(
    private getAllUsersUseCase: GetAllUsersUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  /**
   * GET /users
   * Obtener todos los usuarios
   *
   * Query params opcionales:
   * - limit=10 : limitar cantidad de usuarios
   * - offset=0 : saltar usuarios
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getAllUsersUseCase.execute();

      // Aplicar paginación si se proporciona query params
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;

      let result = users;

      if (limit) {
        result = users.slice(offset, offset + limit);
      }

      res.status(200).json({
        success: true,
        data: result,
        total: users.length,
        ...(limit && { limit, offset }),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({
        success: false,
        error: message,
      });
    }
  }

  /**
   * GET /users/:id
   * Obtener usuario por ID (param)
   *
   * Params:
   * - id : identificador único del usuario (en la URL)
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await this.getUserByIdUseCase.execute(id);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({
        success: false,
        error: message,
      });
    }
  }

  /**
   * POST /users
   * Crear nuevo usuario
   *
   * Body (JSON):
   * {
   *   "name": "Juan Pérez",
   *   "email": "juan@example.com"
   * }
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateUserDTO = req.body;

      const user = await this.createUserUseCase.execute(data);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({
        success: false,
        error: message,
      });
    }
  }

  /**
   * PUT /users/:id
   * Actualizar usuario (param + body)
   *
   * Params:
   * - id : identificador único del usuario
   *
   * Body (JSON) - campos opcionales:
   * {
   *   "name": "Nuevo nombre",
   *   "email": "newemail@example.com"
   * }
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateUserDTO = req.body;

      const user = await this.updateUserUseCase.execute(id, data);

      if (!user) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({
        success: false,
        error: message,
      });
    }
  }

  /**
   * DELETE /users/:id
   * Eliminar usuario (param)
   *
   * Params:
   * - id : identificador único del usuario
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await this.deleteUserUseCase.execute(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: 'User not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      res.status(400).json({
        success: false,
        error: message,
      });
    }
  }
}
