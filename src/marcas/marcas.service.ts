import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity';
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';
 
@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private marcasRepository: Repository<Marca>,
  ) {}
 
  create(dto: CreateMarcaDto) {
    const marca = this.marcasRepository.create(dto);
    return this.marcasRepository.save(marca);
  }
 
  findAll() {
    return this.marcasRepository.find();
  }
 
  async findOne(id: number) {
    const marca = await this.marcasRepository.findOneBy({ id });
    if (!marca) {
      throw new NotFoundException(`No existe una marca con id ${id}`);
    }
    return marca;
  }
 
  async update(id: number, dto: UpdateMarcaDto) {
    const marca = await this.findOne(id);
    Object.assign(marca, dto);
    return this.marcasRepository.save(marca);
  }
 
  async remove(id: number) {
    const marca = await this.findOne(id);
    return this.marcasRepository.remove(marca);
  }
}
