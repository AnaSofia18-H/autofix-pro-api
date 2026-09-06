import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MecanicosService } from './mecanicos.service';
import { MecanicosController } from './mecanicos.controller';
import { Mecanico } from './entities/mecanico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mecanico])],
  controllers: [MecanicosController],
  providers: [MecanicosService],
})
export class MecanicosModule {}
