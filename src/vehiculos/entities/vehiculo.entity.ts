import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Modelo } from '../../modelos/entities/modelo.entity';
 
@Entity('vehiculos')
export class Vehiculo {
  @PrimaryGeneratedColumn()
  id: number;
 
  @Column()
  placa: string;
 
  @Column()
  color: string;
 
  @Column()
  anio: number;
 
  @ManyToOne(() => Modelo)
  @JoinColumn({ name: 'modelo_id' })
  modelo: Modelo;
}
