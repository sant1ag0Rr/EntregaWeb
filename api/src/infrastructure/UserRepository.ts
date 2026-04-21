/**
 * INFRASTRUCTURE - User Repository (Implementación)
 * 
 * Implementación del repositorio que simula base de datos en memoria.
 * Aquí es donde iría la conexión real a una BD (MongoDB, PostgreSQL, etc)
 */

import { v4 as uuidv4 } from 'uuid';
import type { User, CreateUserDTO, UpdateUserDTO } from 'domain/User';
import type { IUserRepository } from 'domain/IUserRepository';

export class UserRepository implements IUserRepository {
  // Base de datos simulada en memoria
  private users: Map<string, User> = new Map();

  // Constructor - inicializar con datos de ejemplo
  constructor() {
    this.seedDatabase();
  }

  /**
   * Llenar la BD inicial con datos de ejemplo
   */
  private seedDatabase(): void {
    const initialUsers: User[] = [
      {
        id: uuidv4(),
        name: 'Santiago Rodriguez',
        email: 'santiago@example.com',
        createdAt: new Date('2024-01-15'),
      },
      {
        id: uuidv4(),
        name: 'Victor Monsalve',
        email: 'victor@example.com',
        createdAt: new Date('2024-01-20'),
      },
      {
        id: uuidv4(),
        name: 'Matias Herrera',
        email: 'matias@example.com',
        createdAt: new Date('2024-01-25'),
      },
    ];

    initialUsers.forEach((user) => {
      this.users.set(user.id, user);
    });
  }

  /**
   * Obtener todos los usuarios
   */
  async getAll(): Promise<User[]> {
    // Simular latencia de BD
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Array.from(this.users.values()));
      }, 100);
    });
  }

  /**
   * Obtener usuario por ID
   */
  async getById(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users.get(id) || null);
      }, 50);
    });
  }

  /**
   * Crear nuevo usuario
   */
  async create(data: CreateUserDTO): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: uuidv4(),
          name: data.name,
          email: data.email,
          createdAt: new Date(),
        };

        this.users.set(newUser.id, newUser);
        resolve(newUser);
      }, 100);
    });
  }

  /**
   * Actualizar usuario
   */
  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.get(id);

        if (!user) {
          resolve(null);
          return;
        }

        // Actualizar solo los campos proporcionados
        const updatedUser: User = {
          ...user,
          name: data.name !== undefined ? data.name : user.name,
          email: data.email !== undefined ? data.email : user.email,
        };

        this.users.set(id, updatedUser);
        resolve(updatedUser);
      }, 100);
    });
  }

  /**
   * Eliminar usuario
   */
  async delete(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existed = this.users.has(id);
        this.users.delete(id);
        resolve(existed);
      }, 50);
    });
  }
}
