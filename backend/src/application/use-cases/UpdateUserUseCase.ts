import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";

interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
}

// Application layer: validate and update users.
export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateUserInput): Promise<User> {
    const id = input.id?.trim();
    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();

    if (!id || !name || !email) {
      throw new AppError("Id, name and email are required.", 400);
    }

    const existingByEmail = await this.userRepository.findByEmail(email);
    if (existingByEmail && existingByEmail.id !== id) {
      throw new AppError(`Email "${email}" is already in use.`, 409);
    }

    const updatedUser = await this.userRepository.update(id, { name, email });

    if (!updatedUser) {
      throw new AppError(`User with id "${id}" not found.`, 404);
    }

    return updatedUser;
  }
}
