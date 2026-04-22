import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { AppError } from "../../domain/errors/AppError";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CreateUserInput {
  name: string;
  email: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const name = input.name?.trim();
    const email = input.email?.trim().toLowerCase();

    if (!name || !email) {
      throw new AppError("Name and email are required.", 400);
    }

    if (!EMAIL_REGEX.test(email)) {
      throw new AppError("Email format is invalid.", 400);
    }

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new AppError(`Email "${email}" is already in use.`, 409);
    }

    return this.userRepository.create({ name, email });
  }
}
