import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY_TOKEN } from '../../domain/tokens/user.tokens';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
