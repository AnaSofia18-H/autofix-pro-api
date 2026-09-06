import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mecanico } from './entities/mecanico.entity';
import { CreateMecanicoDto } from './dto/create-mecanico.dto';
import { UpdateMecanicoDto } from './dto/update-mecanico.dto';

@Injectable()
export class MecanicosService {
  constructor(
    @InjectRepository(Mecanico)
    private mecanicosRepository: Repository<Mecanico>,
  ) {}

  create(dto: CreateMecanicoDto) {
    const mecanico = this.mecanicosRepository.create(dto);
    return this.mecanicosRepository.save(mecanico);
  }

  findAll() {
    return this.mecanicosRepository.find();
  }

  async findOne(id: number) {
    const mecanico = await this.mecanicosRepository.findOneBy({ id });

    if (!mecanico) {
      throw new NotFoundException(`No existe un mecánico con id ${id}`);
    }

    return mecanico;
  }

  async update(id: number, dto: UpdateMecanicoDto) {
    const mecanico = await this.findOne(id);
    Object.assign(mecanico, dto);
    return this.mecanicosRepository.save(mecanico);
  }

  async remove(id: number) {
    const mecanico = await this.findOne(id);
    return this.mecanicosRepository.remove(mecanico);
  }
}
