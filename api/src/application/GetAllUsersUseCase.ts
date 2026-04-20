/**
 * APPLICATION - Get All Users Use Case
 * 
 * Caso de uso para obtener todos los usuarios
 * Recibe el repositorio inyectado y lo utiliza.
 */

import type { User } from 'domain/User';
import type { IUserRepository } from 'domain/IUserRepository';

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getAll();
  }
}
