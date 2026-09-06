import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mecanicos')
export class Mecanico {
    @PrimaryGeneratedColumn()
    id: number;
}
