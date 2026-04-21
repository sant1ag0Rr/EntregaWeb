/**
 * APPLICATION - Get User By ID Use Case
 * 
 * Caso de uso para obtener un usuario por su ID
 */

import type { User } from 'domain/User';
import type { IUserRepository } from 'domain/IUserRepository';

export class GetUserByIdUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User | null> {
    if (!id || id.trim() === '') {
      throw new Error('ID is required');
    }
    return await this.userRepository.getById(id);
  }
}
