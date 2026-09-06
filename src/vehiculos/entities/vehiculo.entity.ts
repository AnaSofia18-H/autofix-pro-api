import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehiculos')
export class Vehiculo {
    @PrimaryGeneratedColumn()
    id: number;
}
