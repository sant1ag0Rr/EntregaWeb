import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";

interface CreateUserInput {
  name: string;
  email: string;
}

// Application layer: validate and create users.
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();

    if (!name || !email) {
      throw new AppError("Name and email are required.", 400);
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError(`Email "${email}" is already in use.`, 409);
    }

    return this.userRepository.create({ name, email });
  }
}
