import { Module } from '@nestjs/common';
import { RepuestosModule } from './repuestos/repuestos.module';
import { OrdenesServicioModule } from './ordenes-servicio/ordenes-servicio.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    DatabaseModule,
    RepuestosModule,
    OrdenesServicioModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
