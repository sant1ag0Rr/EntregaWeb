/**
 * APPLICATION - Update User Use Case
 * 
 * Caso de uso para actualizar un usuario existente
 */

import type { User, UpdateUserDTO } from 'domain/User';
import type { IUserRepository } from 'domain/IUserRepository';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: UpdateUserDTO): Promise<User | null> {
    if (!id || id.trim() === '') {
      throw new Error('ID is required');
    }

    // Validar que al menos un campo está siendo actualizado
    if (!data.name && !data.email) {
      throw new Error('At least one field (name or email) must be provided');
    }

    // Si email es proporcionado, validar su formato
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error('Invalid email format');
      }
    }

    return await this.userRepository.update(id, data);
  }
}
