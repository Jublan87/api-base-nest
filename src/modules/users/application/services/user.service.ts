import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { FindUserUseCase } from '../use-cases/find-user.use-case';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserUseCase: FindUserUseCase
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(createUserDto);
    return this.mapToResponse(user);
  }

  async findUserById(id: string): Promise<UserResponseDto> {
    const user = await this.findUserUseCase.findById(id);
    return this.mapToResponse(user);
  }

  async findUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.findUserUseCase.findByEmail(email);
    return this.mapToResponse(user);
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.findUserUseCase.findAll();
    return users.map((user) => this.mapToResponse(user));
  }

  private mapToResponse(user: any): UserResponseDto {
    const primitives = user.toPrimitives();
    return {
      id: primitives.id,
      email: primitives.email,
      name: primitives.name,
      createdAt: primitives.createdAt,
      updatedAt: primitives.updatedAt,
    };
  }
}
