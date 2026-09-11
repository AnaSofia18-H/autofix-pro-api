import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { CreateVehiculoDto } from './dto/create-vehiculo.dto';
import { UpdateVehiculoDto } from './dto/update-vehiculo.dto';

@Injectable()
export class VehiculosService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  async create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
    const nuevoVehiculo = this.vehiculoRepository.create(createVehiculoDto as any);
    return await this.vehiculoRepository.save(nuevoVehiculo as any);
  }

  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find();
  }

  async findOne(id: number): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { id }
    });
    if (!vehiculo) {
      throw new NotFoundException(`No existe el vehículo con id ${id}`);
    }
    return vehiculo;
  }
  
  async update(id: number, updateVehiculoDto: UpdateVehiculoDto): Promise<Vehiculo> {
    const vehiculo = await this.findOne(id);
    this.vehiculoRepository.merge(vehiculo, updateVehiculoDto as any);
    return await this.vehiculoRepository.save(vehiculo);
  }
  
  async remove(id: number): Promise<void> {
    const vehiculo = await this.findOne(id); // Valida correctamente si existe primero
    try {
      await this.vehiculoRepository.remove(vehiculo);
    } catch (error: any) { // <- Agregamos ': any' aquí para solucionar el error de TypeScript
      // Captura el error específico de MySQL cuando el registro está referenciado como llave foránea
      if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
        throw new BadRequestException(
          'No se puede eliminar el vehículo porque tiene órdenes de servicio asociadas.'
        );
      }
      // Si ocurre cualquier otra falla inesperada en la base de datos, la propaga
      throw error;
    }
  }
}
