import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelosService } from './modelos.service';
import { ModelosController } from './modelos.controller';
import { Modelo } from './entities/modelo.entity';
import { Marca } from '../marcas/entities/marca.entity';
 
@Module({
  imports: [TypeOrmModule.forFeature([Modelo, Marca])],
  controllers: [ModelosController],
  providers: [ModelosService],
  exports: [ModelosService],
})
export class ModelosModule {}
