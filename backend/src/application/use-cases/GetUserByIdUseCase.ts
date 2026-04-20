import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";

// Application layer: fetch one user and enforce not-found rule.
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(`User with id "${id}" not found.`, 404);
    }

    return user;
  }
}
