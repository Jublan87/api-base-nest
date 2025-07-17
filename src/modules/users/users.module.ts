import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserUseCase } from './application/use-cases/find-user.use-case';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { USER_REPOSITORY_TOKEN } from './domain/tokens/user.tokens';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    FindUserUseCase,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UsersModule {}
