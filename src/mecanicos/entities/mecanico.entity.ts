import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('mecanicos')
export class Mecanico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  especialidad: string;
}
