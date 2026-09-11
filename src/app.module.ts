import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Importaciones de los módulos de tus compañeros
import { MecanicosModule } from './mecanicos/mecanicos.module';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';
import { VehiculosModule } from './vehiculos/vehiculos.module';
import { RepuestosModule } from './repuestos/repuestos.module';
import { OrdenesServicioModule } from './ordenes-servicio/ordenes-servicio.module';

@Module({
  imports: [
    MecanicosModule,
    MarcasModule,
    ModelosModule,
    VehiculosModule,
    RepuestosModule,
    OrdenesServicioModule,
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en todo el proyecto
    }),
    TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST, 
  port: parseInt(process.env.DB_PORT ?? '3306', 10), 
   username: process.env.DB_UDERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   entities: [__dirname + '/**/*.entity{.ts,.js}'],
   synchronize: true,
})
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
