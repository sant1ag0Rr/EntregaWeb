import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface UpdateUserInput {
  id: string;
  name: string;
  email: string;
}

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateUserInput): Promise<User> {
    const id = input.id?.trim();
    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();

    if (!id || !name || !email) {
      throw new AppError("Id, name and email are required.", 400);
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new AppError("Email format is invalid.", 400);
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
