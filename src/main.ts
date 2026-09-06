import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configura el prefijo global para tus rutas (ej: http://localhost:8080/api/...)
  app.setGlobalPrefix('api');

  const port = 8080;
  await app.listen(port);
  
  // Esto hará que aparezca el mensaje en tu terminal al iniciar
  Logger.log(`Escuchando en el puerto ${port}`, 'Bootstrap');
}

bootstrap();
