import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { OrdenServicio } from './orden-servicio.entity';

import { Repuesto } from '../../repuestos/entities/repuesto.entity';

@Entity('detalle_orden_repuesto')
export class DetalleOrdenRepuesto {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => OrdenServicio, (orden) => orden.detalles)
    @JoinColumn({ name: 'orden_servicio_id' })
    ordenServicio: OrdenServicio;
    
    @ManyToOne(() => Repuesto)
    @JoinColumn({ name: 'repuesto_id' })
    repuesto: Repuesto;
    
    @Column({ default: 1 })
    cantidad: number;

}
