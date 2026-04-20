import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

// Application layer: list users with optional filters.
export class GetUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(filters?: { email?: string }): Promise<User[]> {
    return this.userRepository.findAll(filters);
  }
}
