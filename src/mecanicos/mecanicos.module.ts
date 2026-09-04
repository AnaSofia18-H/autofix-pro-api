import { Module } from '@nestjs/common';
import { MecanicosService } from './mecanicos.service';
import { MecanicosController } from './mecanicos.controller';

@Module({
  providers: [MecanicosService],
  controllers: [MecanicosController]
})
export class MecanicosModule {}
