import { User } from "../entities/User";

// Repository contract: application depends on this abstraction only.
export interface IUserRepository {
  findAll(filters?: { email?: string }): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(input: Omit<User, "id">): Promise<User>;
  update(id: string, input: Omit<User, "id">): Promise<User | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<User | null>;
}
