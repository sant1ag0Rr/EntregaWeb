/**
 * APPLICATION - Delete User Use Case
 * 
 * Caso de uso para eliminar un usuario
 */

import type { IUserRepository } from 'domain/IUserRepository';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<boolean> {
    if (!id || id.trim() === '') {
      throw new Error('ID is required');
    }

    return await this.userRepository.delete(id);
  }
}
