import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';

import { OrdenesServicioService } from './ordenes-servicio.service';

import { CreateOrdenServicioDto } from './dto/create-orden-servicio.dto';

@Controller('ordenes-servicio')
export class OrdenesServicioController {
    constructor(private readonly ordenesService: OrdenesServicioService) {}
    
    @Post()
    create(@Body() dto: CreateOrdenServicioDto) {
        return this.ordenesService.create(dto);
    }
    
    @Get()
    findAll() {
        return this.ordenesService.findAll();
    }
    
    @Patch(':id/agregar-repuesto')
    agregarRepuesto(
        @Param('id') ordenId: string,
        @Body('repuestoId') repuestoId: number,
        @Body('cantidad') cantidad: number,
    ) {
        return this.ordenesService.agregarRepuesto(+ordenId, repuestoId, cantidad);
    }
    @Patch(':id/cerrar')
    cerrarOrden(@Param('id') id: string) {
        return this.ordenesService.cerrarOrden(+id);
    }
}
