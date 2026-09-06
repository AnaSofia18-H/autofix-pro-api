import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repuesto } from './entities/repuesto.entity';
import { CreateRepuestoDto } from './dto/create-repuesto.dto';
import { UpdateRepuestoDto } from './dto/update-repuesto.dto';

@Injectable()
export class RepuestosService {
    constructor(
        @InjectRepository(Repuesto)
        private repuestosRepository: Repository<Repuesto>,
    ) {}
    create(dto: CreateRepuestoDto) {
        const repuesto = this.repuestosRepository.create(dto);
        return this.repuestosRepository.save(repuesto);
    }
    findAll() {
        return this.repuestosRepository.find();
    }
    async findOne(id: number) {
        const repuesto = await this.repuestosRepository.findOneBy({ id });
        if (!repuesto) {
            throw new NotFoundException(`No existe un repuesto con id ${id}`);
        }
        return repuesto;
    }
    async update(id: number, dto: UpdateRepuestoDto) {
        const repuesto = await this.findOne(id);
        Object.assign(repuesto, dto);
        return this.repuestosRepository.save(repuesto);
    }
    async remove(id: number) {
        const repuesto = await this.findOne(id);
        return this.repuestosRepository.remove(repuesto);
    }
}
