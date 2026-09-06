import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('repuestos')
export class Repuesto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nombre: string;
}
