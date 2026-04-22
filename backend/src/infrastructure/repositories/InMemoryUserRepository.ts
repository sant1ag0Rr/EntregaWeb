import { randomUUID } from "crypto";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private readonly users: User[] = [
    {
      id: "usr-santiago-rodriguez",
      name: "Santiago Rodriguez",
      email: "santiago@example.com"
    },
    {
      id: "usr-victor-monsalve",
      name: "Victor Monsalve",
      email: "victor@example.com"
    },
    {
      id: "usr-matias-herrera",
      name: "Matias Herrera",
      email: "matias@example.com"
    },
    {
      id: "usr-julian-carmona",
      name: "Julian Carmona",
      email: "julian.carmona@example.com"
    },
    {
      id: "usr-valentina-gomez",
      name: "Valentina Gomez",
      email: "valentina.gomez@example.com"
    },
    {
      id: "usr-laura-cardenas",
      name: "Laura Cardenas",
      email: "laura.cardenas@example.com"
    },
    {
      id: "usr-andres-lopez",
      name: "Andres Lopez",
      email: "andres.lopez@example.com"
    },
    {
      id: "usr-camila-torres",
      name: "Camila Torres",
      email: "camila.torres@example.com"
    },
    {
      id: "usr-nicolas-ramirez",
      name: "Nicolas Ramirez",
      email: "nicolas.ramirez@example.com"
    },
    {
      id: "usr-daniela-castro",
      name: "Daniela Castro",
      email: "daniela.castro@example.com"
    }
  ];

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
