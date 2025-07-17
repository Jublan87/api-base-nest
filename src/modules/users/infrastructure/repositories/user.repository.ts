import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async save(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}
