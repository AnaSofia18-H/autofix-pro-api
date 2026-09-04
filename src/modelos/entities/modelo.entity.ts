import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Marca } from '../../marcas/entities/marca.entity';

@Entity('modelos')
export class Modelo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(() => Marca, (marca) => marca.modelos)
  @JoinColumn({ name: 'marca_id' })
  marca: Marca;
}