/**
 * DOMAIN - Interfaz del Repositorio
 * 
 * Define el contrato que debe cumplir cualquier repositorio de usuarios.
 * Esto nos permite cambiar la implementación (memoria, BD real, etc)
 * sin afectar el resto de la aplicación (Principio de Inversión de Dependencias)
 */

import { User, CreateUserDTO, UpdateUserDTO } from './User';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  create(data: CreateUserDTO): Promise<User>;
  update(id: string, data: UpdateUserDTO): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
