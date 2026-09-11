import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entities/marca.entity'; // Verifica la ruta de tu entidad
import { CreateMarcaDto } from './dto/create-marca.dto';
import { UpdateMarcaDto } from './dto/update-marca.dto';

@Injectable()
export class MarcasService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  async create(dto: CreateMarcaDto) {
    const nuevaMarca = this.marcaRepository.create(dto as any);
    return await this.marcaRepository.save(nuevaMarca);
  }

  async findAll() {
    return await this.marcaRepository.find();
  }

  // 🔍 AQUÍ FALLABA EL GET POR ID: Debe buscar con el objeto 'where' correctamente
  async findOne(id: number) {
    const marca = await this.marcaRepository.findOne({
      where: { id } as any
    });
    if (!marca) {
      throw new NotFoundException(`No existe la marca con el id ${id}`);
    }
    return marca;
  }

  // 📝 AQUÍ FALLABA EL PATCH: Debe fusionar el DTO con el registro encontrado
  async update(id: number, dto: UpdateMarcaDto) {
    const marca = await this.findOne(id);
    this.marcaRepository.merge(marca, dto as any);
    return await this.marcaRepository.save(marca);
  }

  // ❌ AQUÍ FALLABA EL DELETE: El mismo problema de llaves foráneas que tenías tú
  async remove(id: number) {
    const marca = await this.findOne(id);
    try {
      await this.marcaRepository.remove(marca);
    } catch (error: any) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
        throw new BadRequestException(
          'No se puede eliminar la marca porque tiene modelos o vehículos asociados.'
        );
      }
      throw error;
    }
  }
}
