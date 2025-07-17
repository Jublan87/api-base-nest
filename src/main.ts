import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Configurar Swagger para documentación de API
  const config = new DocumentBuilder()
    .setTitle('API Base NestJS')
    .setDescription(
      'API REST base desarrollada con NestJS, TypeScript y Express'
    )
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Puerto de la aplicación
  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Aplicación ejecutándose en: http://localhost:${port}`);
  console.log(`Documentación Swagger en: http://localhost:${port}/api`);
}

bootstrap();
