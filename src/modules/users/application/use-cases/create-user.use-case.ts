import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { USER_REPOSITORY_TOKEN } from '../../domain/tokens/user.tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepositoryInterface
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findByEmail(
      createUserDto.email
    );
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con este email');
    }

    // Crear nueva entidad
    const user = User.create(createUserDto.email, createUserDto.name);

    // Guardar en repositorio
    await this.userRepository.save(user);

    return user;
  }
}
