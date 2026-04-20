import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";

// Application layer: delete users and enforce not-found rule.
export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<void> {
    const deleted = await this.userRepository.delete(id);

    if (!deleted) {
      throw new AppError(`User with id "${id}" not found.`, 404);
    }
  }
}
