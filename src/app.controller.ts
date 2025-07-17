import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('core')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @ApiOperation({ summary: 'Verificar estado de salud del servidor' })
  @ApiResponse({ status: 200, description: 'Servidor saludable.' })
  getHealth(): object {
    return this.appService.getHealth();
  }
}
