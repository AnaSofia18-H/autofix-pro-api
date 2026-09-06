import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepuestosService } from './repuestos.service';
import { RepuestosController } from './repuestos.controller';
import { Repuesto } from './entities/repuesto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Repuesto])],
  controllers: [RepuestosController],
  providers: [RepuestosService],
  exports: [RepuestosService],

})

export class RepuestosModule {}
