import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MarcasModule } from './marcas/marcas.module';
import { ModelosModule } from './modelos/modelos.module';

@Module({
  imports: [MarcasModule, ModelosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
