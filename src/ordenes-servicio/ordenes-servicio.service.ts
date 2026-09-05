import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdenServicio, EstadoOrden } from './entities/orden-servicio.entity';
import { DetalleOrdenRepuesto } from './entities/detalle-orden-repuesto.entity';
import { Vehiculo } from '../vehiculos/entities/vehiculo.entity';
import { Mecanico } from '../mecanicos/entities/mecanico.entity';
import { CreateOrdenServicioDto } from './dto/create-orden-servicio.dto';

@Injectable()
export class OrdenesServicioService {

    constructor(
        @InjectRepository(OrdenServicio)
        private ordenesRepository: Repository<OrdenServicio>,
        
        @InjectRepository(DetalleOrdenRepuesto)
        private detallesRepository: Repository<DetalleOrdenRepuesto>,
        
        @InjectRepository(Vehiculo)
        private vehiculosRepository: Repository<Vehiculo>,
        
        @InjectRepository(Mecanico)
        private mecanicosRepository: Repository<Mecanico>,
    ) {}

    async create(dto: CreateOrdenServicioDto) {
        const vehiculo = await this.vehiculosRepository.findOneBy({ id: dto.vehiculoId });
        if (!vehiculo) {
            throw new NotFoundException(`No existe el vehículo con id ${dto.vehiculoId}`);
        }
        
        const mecanico = await this.mecanicosRepository.findOneBy({ id: dto.mecanicoId });
        if (!mecanico) {
            throw new NotFoundException(`No existe el mecánico con id ${dto.mecanicoId}`);
        }
        
        const ordenActiva = await this.ordenesRepository.findOneBy({
            vehiculo: { id: dto.vehiculoId },
            estado: EstadoOrden.ABIERTA,
        });
        
        if (ordenActiva) {
            throw new BadRequestException('El vehículo ya tiene una orden de servicio abierta.');
        }
        
        const nuevaOrden = this.ordenesRepository.create({
            vehiculo,
            mecanico,
            estado: EstadoOrden.ABIERTA,
        });
        
        return this.ordenesRepository.save(nuevaOrden);
    }
    
    findAll() {
        return this.ordenesRepository.find({
            relations: {
                vehiculo: true,
                mecanico: true,
                detalles: {
                    repuesto: true,
                },
            },
        });
    }
    
    async agregarRepuesto(ordenId: number, repuestoId: number, cantidad: number) {
        const orden = await this.ordenesRepository.findOneBy({ id: ordenId });
        if (!orden) {
            throw new NotFoundException(`No existe la orden con id ${ordenId}`);
        }
        if (orden.estado === EstadoOrden.CERRADA) {
            throw new BadRequestException('No se pueden agregar repuestos a una orden cerrada.');
        }
        const detalle = this.detallesRepository.create({
            ordenServicio: orden,
            repuesto: { id: repuestoId },
            cantidad,
        });
        return this.detallesRepository.save(detalle);
    }
    
    async cerrarOrden(id: number) {
        const orden = await this.ordenesRepository.findOneBy({ id });
        if (!orden) {
            throw new NotFoundException(`No existe la orden con id ${id}`);
        }
        orden.estado = EstadoOrden.CERRADA;
        orden.fechaCierre = new Date();
        return this.ordenesRepository.save(orden);
    }
}
