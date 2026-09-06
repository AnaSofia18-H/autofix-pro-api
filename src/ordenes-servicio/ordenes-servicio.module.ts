import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenesServicioService } from './ordenes-servicio.service';
import { OrdenesServicioController } from './ordenes-servicio.controller';
import { OrdenServicio } from './entities/orden-servicio.entity';
import { DetalleOrdenRepuesto } from './entities/detalle-orden-repuesto.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { Mecanico } from '../mecanicos/entities/mecanico.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([
      OrdenServicio,
      DetalleOrdenRepuesto,
      Vehiculo,
      Mecanico,
    ]),
  ],
  controllers: [OrdenesServicioController],
  providers: [OrdenesServicioService],
})

export class OrdenesServicioModule {}
