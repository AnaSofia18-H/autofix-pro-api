import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MecanicosModule } from './mecanicos/mecanicos.module';
import { DatabaseModule } from './database/database.module';
import { RepuestosModule } from './repuestos/repuestos.module';
import { OrdenesServicioModule } from './ordenes-servicio/ordenes-servicio.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '3306', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    MecanicosModule,
    DatabaseModule,
RepuestosModule,
OrdenesServicioModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
