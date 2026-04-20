import { randomUUID } from "crypto";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

// Infrastructure repository: in-memory data source for users.
export class InMemoryUserRepository implements IUserRepository {
  private readonly users: User[] = [];

  async findAll(filters?: { email?: string }): Promise<User[]> {
    if (!filters?.email) {
      return [...this.users];
    }

    const normalizedEmail = this.normalize(filters.email);
    return this.users.filter((user) => this.normalize(user.email).includes(normalizedEmail));
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async create(input: Omit<User, "id">): Promise<User> {
    const newUser: User = {
      id: randomUUID(),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase()
    };

    this.users.push(newUser);
    return newUser;
  }

  async update(id: string, input: Omit<User, "id">): Promise<User | null> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      return null;
    }

    const updatedUser: User = {
      id,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase()
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      return false;
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  async findByEmail(email: string): Promise<User | null> {
    const normalizedEmail = this.normalize(email);
    return this.users.find((user) => this.normalize(user.email) === normalizedEmail) ?? null;
  }

  private normalize(value: string): string {
    return value.trim().toLowerCase();
  }
}
