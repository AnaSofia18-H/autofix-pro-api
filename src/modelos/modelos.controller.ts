import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ModelosService } from './modelos.service';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
 
@Controller('modelos')
export class ModelosController {
  constructor(private readonly modelosService: ModelosService) {}
 
  @Post()
  create(@Body() dto: CreateModeloDto) {
    return this.modelosService.create(dto);
  }
 
  @Get()
  findAll() {
    return this.modelosService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.modelosService.findOne(id);
  }
 
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateModeloDto) {
    return this.modelosService.update(id, dto);
  }
 
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.modelosService.remove(id);
  }
}
