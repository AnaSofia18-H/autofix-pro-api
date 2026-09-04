import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modelo } from './entities/modelo.entity';
import { Marca } from '../marcas/entities/marca.entity';
import { CreateModeloDto } from './dto/create-modelo.dto';
import { UpdateModeloDto } from './dto/update-modelo.dto';
 
@Injectable()
export class ModelosService {
  constructor(
    @InjectRepository(Modelo)
    private modelosRepository: Repository<Modelo>,
    @InjectRepository(Marca)
    private marcasRepository: Repository<Marca>,
  ) {}
 
  async create(dto: CreateModeloDto) {
    const marca = await this.marcasRepository.findOneBy({ id: dto.marcaId });
    if (!marca) {
      throw new NotFoundException(`No existe una marca con id ${dto.marcaId}`);
    }
    const modelo = this.modelosRepository.create({ nombre: dto.nombre, marca });
    return this.modelosRepository.save(modelo);
  }
 
  findAll() {
    return this.modelosRepository.find({ relations: ['marca'] });
  }
 
  async findOne(id: number) {
    const modelo = await this.modelosRepository.findOne({ where: { id }, relations: ['marca'] });
    if (!modelo) {
      throw new NotFoundException(`No existe un modelo con id ${id}`);
    }
    return modelo;
  }
 
  async update(id: number, dto: UpdateModeloDto) {
    const modelo = await this.findOne(id);
    if (dto.marcaId) {
      const marca = await this.marcasRepository.findOneBy({ id: dto.marcaId });
      if (!marca) {
        throw new NotFoundException(`No existe una marca con id ${dto.marcaId}`);
      }
      modelo.marca = marca;
    }
    if (dto.nombre) {
      modelo.nombre = dto.nombre;
    }
    return this.modelosRepository.save(modelo);
  }
 
  async remove(id: number) {
    const modelo = await this.findOne(id);
    return this.modelosRepository.remove(modelo);
  }
}
