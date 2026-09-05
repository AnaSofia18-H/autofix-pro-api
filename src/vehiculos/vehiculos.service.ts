import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { Modelo } from '../modelos/entities/modelo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';
 
@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private vehiculosRepository: Repository<Vehiculo>,
    @InjectRepository(Modelo)
    private modelosRepository: Repository<Modelo>,
  ) {}
 
  async create(dto: CreateVehiculoDto) {
    const modelo = await this.modelosRepository.findOneBy({ id: dto.modeloId });
    if (!modelo) {
      throw new NotFoundException(`No existe un modelo con id ${dto.modeloId}`);
    }
    const vehiculo = this.vehiculosRepository.create({
      placa: dto.placa,
      color: dto.color,
      anio: dto.anio,
      modelo,
    });
    return this.vehiculosRepository.save(vehiculo);
  }
 
 findAll() {
  return this.vehiculoRepository.find({ relations: ['modelo'] });
}

findOne(id: number) {
  return this.vehiculoRepository.findOne({ where: { id }, relations: ['modelo'] });
}
  }
 
  async findOne(id: number) {
    const vehiculo = await this.vehiculosRepository.findOne({
      where: { id },
      relations: ['modelo', 'modelo.marca'],
    });
    if (!vehiculo) {
      throw new NotFoundException(`No existe un vehículo con id ${id}`);
    }
    return vehiculo;
  }
 
  async update(id: number, dto: UpdateVehiculoDto) {
    const vehiculo = await this.findOne(id);
    if (dto.modeloId) {
      const modelo = await this.modelosRepository.findOneBy({ id: dto.modeloId });
      if (!modelo) {
        throw new NotFoundException(`No existe un modelo con id ${dto.modeloId}`);
      }
      vehiculo.modelo = modelo;
    }
    Object.assign(vehiculo, {
      placa: dto.placa ?? vehiculo.placa,
      color: dto.color ?? vehiculo.color,
      anio: dto.anio ?? vehiculo.anio,
    });
    return this.vehiculosRepository.save(vehiculo);
  }
 
  async remove(id: number) {
    const vehiculo = await this.findOne(id);
    return this.vehiculosRepository.remove(vehiculo);
  }
}
