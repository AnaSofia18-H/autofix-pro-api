import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Modelo } from '../../modelos/entities/modelo.entity';

@Entity('marcas')
export class Marca {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Modelo, (modelo) => modelo.marca)
  modelos: Modelo[];
}