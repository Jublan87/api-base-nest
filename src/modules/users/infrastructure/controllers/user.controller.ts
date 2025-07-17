import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { UserService } from '../../application/services/user.service';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UserResponseDto } from '../../application/dto/user-response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Ya existe un usuario con este email',
  })
  async createUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida exitosamente',
    type: [UserResponseDto],
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Buscar usuario por email',
  })
  async findUsers(@Query('email') email?: string): Promise<UserResponseDto[]> {
    if (email) {
      const user = await this.userService.findUserByEmail(email);
      return [user];
    }
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  async findUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.findUserById(id);
  }
}
