/**
 * APPLICATION - Create User Use Case
 * 
 * Caso de uso para crear un nuevo usuario
 * Realiza validaciones de negocio antes de crear
 */

import type { User, CreateUserDTO } from 'domain/User';
import type { IUserRepository } from 'domain/IUserRepository';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    // Validaciones de negocio
    if (!data.name || data.name.trim() === '') {
      throw new Error('Name is required');
    }

    if (!data.email || data.email.trim() === '') {
      throw new Error('Email is required');
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Invalid email format');
    }

    return await this.userRepository.create(data);
  }
}
