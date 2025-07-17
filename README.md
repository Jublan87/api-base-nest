# API REST Base con NestJS

Una API REST base desarrollada con **NestJS**, **TypeScript** y **Express** que incluye endpoint de health para verificar el estado de la aplicación.

## 🚀 Características

- ✅ Framework NestJS con TypeScript
- ✅ Documentación automática con Swagger
- ✅ Validación de datos con class-validator
- ✅ Estructura modular escalable
- ✅ Configuración de CORS
- ✅ Endpoint de health con información de la aplicación (nombre y versión desde package.json)

## 📦 Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno (opcional):**
```bash
cp .env.example .env
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run start:dev     # Modo desarrollo con hot-reload
npm run start:debug   # Modo debug

# Producción
npm run build         # Compilar aplicación
npm run start:prod    # Ejecutar en producción

# Testing
npm run test          # Ejecutar tests
npm run test:watch    # Tests en modo watch
npm run test:cov      # Coverage de tests

# Linting y formato
npm run lint          # Ejecutar linter
npm run format        # Formatear código
```

## 🌐 Endpoints de la API

### Endpoint de Health

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Estado de salud del servidor con información de la aplicación |

### Respuesta del Endpoint Health

```json
{
  "status": "ok",
  "message": "La aplicación api-base-nest está corriendo correctamente",
  "app": "api-base-nest",
  "version": "1.0.0",
  "timestamp": "2023-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

*Nota: Los valores `app` y `version` se obtienen automáticamente del `package.json`*

## 📚 Documentación

Una vez que la aplicación esté ejecutándose, puedes acceder a la documentación interactiva de Swagger en:

**http://localhost:3000/api/docs**

## 🏗️ Estructura del Proyecto

```
src/
├── main.ts                    # Punto de entrada de la aplicación
├── app.module.ts              # Módulo raíz
├── app.controller.ts          # Controlador principal con endpoint de health
└── app.service.ts             # Servicio principal con lógica del health check
```

## 🔧 Desarrollo

### Agregar Nuevos Módulos

Para agregar un nuevo módulo, puedes usar el CLI de NestJS:

```bash
# Generar un nuevo módulo completo
nest generate resource nombre-modulo

# O generar componentes individuales
nest generate module nombre-modulo
nest generate controller nombre-modulo
nest generate service nombre-modulo
```

### Personalizar la Información de Health

El endpoint de health obtiene automáticamente el nombre y versión del `package.json`. Si quieres personalizar otros aspectos de la respuesta, puedes editar el método `getHealth()` en `src/app.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import * as packageJson from '../package.json';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      status: 'ok',
      message: `La aplicación ${packageJson.name} está corriendo correctamente`,
      app: packageJson.name,
      version: packageJson.version,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      // Agregar más información personalizada aquí
    };
  }
}
```

### Cambiar Nombre y Versión

Para cambiar el nombre o versión de la aplicación, simplemente edita el `package.json`:

```json
{
  "name": "mi-nueva-api",
  "version": "2.0.0",
  ...
}
```

Los cambios se reflejarán automáticamente en el endpoint `/health`.

## 🚀 Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run start:dev
```

La aplicación estará disponible en **http://localhost:3000**

## 📝 Notas

- Puerto por defecto: `3000` (configurable via `PORT` en `.env`)
- El endpoint de health está documentado en Swagger
- CORS habilitado para desarrollo
- Incluye información del uptime del servidor
- **Nombre y versión se obtienen automáticamente del `package.json`**

## 🔄 Próximos Pasos

Esta es una base sólida que puedes extender con:

- 🔐 Sistema de autenticación JWT
- 🗄️ Integración con base de datos (TypeORM/Prisma)
- 🔒 Middleware de autorización
- 📊 Métricas y monitoreo avanzado
- 🧪 Tests end-to-end
- 🐳 Configuración Docker
- 📝 Logging estructurado
- 🚀 Nuevos endpoints según tus necesidades