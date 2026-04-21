/**
 * INTERFACES - User Routes
 * 
 * Define las rutas HTTP que atiende la aplicación
 */

import { Router } from 'express';
import { UserController } from './UserController';

export function createUserRoutes(userController: UserController): Router {
  const router = Router();

  /**
   * GET /users
   * Obtener todos los usuarios
   */
  router.get('/', (req, res) => userController.getAll(req, res));

  /**
   * GET /users/:id
   * Obtener usuario por ID
   */
  router.get('/:id', (req, res) => userController.getById(req, res));

  /**
   * POST /users
   * Crear nuevo usuario
   */
  router.post('/', (req, res) => userController.create(req, res));

  /**
   * PUT /users/:id
   * Actualizar usuario
   */
  router.put('/:id', (req, res) => userController.update(req, res));

  /**
   * DELETE /users/:id
   * Eliminar usuario
   */
  router.delete('/:id', (req, res) => userController.delete(req, res));

  return router;
}
