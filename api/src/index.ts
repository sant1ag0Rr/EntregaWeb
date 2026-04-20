/**
 * INDEX - Punto de entrada de la aplicación
 * 
 * Aquí se:
 * 1. Instancia Express
 * 2. Configura middlewares
 * 3. Inyecta dependencias
 * 4. Registra rutas
 * 5. Inicia el servidor
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import { UserRepository } from 'infrastructure/UserRepository';
import { GetAllUsersUseCase } from 'application/GetAllUsersUseCase';
import { GetUserByIdUseCase } from 'application/GetUserByIdUseCase';
import { CreateUserUseCase } from 'application/CreateUserUseCase';
import { UpdateUserUseCase } from 'application/UpdateUserUseCase';
import { DeleteUserUseCase } from 'application/DeleteUserUseCase';
import { UserController } from 'interfaces/http/UserController';
import { createUserRoutes } from 'interfaces/http/routes';

// Crear aplicación Express
const app: Express = express();
const PORT = process.env.PORT || 3001;

// ==================== MIDDLEWARES ====================

// JSON Parser - convierte body JSON a objeto JS
app.use(express.json());

// Logger simple
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ==================== INYECCIÓN DE DEPENDENCIAS ====================

// Crear instancia del repositorio (base de datos)
const userRepository = new UserRepository();

// Crear instancias de los casos de uso
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

// Crear instancia del controlador inyectando los casos de uso
const userController = new UserController(
  getAllUsersUseCase,
  getUserByIdUseCase,
  createUserUseCase,
  updateUserUseCase,
  deleteUserUseCase
);

// ==================== RUTAS ====================

// Ruta raíz
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'API REST con Clean Architecture',
    version: '1.0.0',
    endpoints: {
      users: {
        getAll: 'GET /api/users',
        getById: 'GET /api/users/:id',
        create: 'POST /api/users',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id',
      },
    },
  });
});

// Registrar rutas de usuarios
const userRoutes = createUserRoutes(userController);
app.use('/api/users', userRoutes);

// ==================== MANEJO DE ERRORES ====================

// 404 - Ruta no encontrada
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.path,
  });
});

// ==================== INICIAR SERVIDOR ====================

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║         API REST con Clean Architecture                   ║
║         Servidor escuchando en puerto ${PORT}                ║
║         http://localhost:${PORT}                              ║
║                                                            ║
║  Estructura Clean Architecture:                          ║
║  ├── domain/         (Entidades e interfaces)            ║
║  ├── application/    (Casos de uso)                      ║
║  ├── infrastructure/ (Implementaciones)                  ║
║  └── interfaces/     (Controllers y rutas HTTP)          ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;
