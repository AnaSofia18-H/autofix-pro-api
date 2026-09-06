import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Vehiculo } from '../../vehiculos/entities/vehiculo.entity';
import { Mecanico } from '../../mecanicos/entities/mecanico.entity';
import { DetalleOrdenRepuesto } from './detalle-orden-repuesto.entity';

export enum EstadoOrden {
    ABIERTA = 'Abierta',
    CERRADA = 'Cerrada',
}

@Entity('ordenes_servicio')
export class OrdenServicio {
        @PrimaryGeneratedColumn()
        id: number;
        @ManyToOne(() => Vehiculo)
        @JoinColumn({ name: 'vehiculo_id' })
        vehiculo: Vehiculo;
        @ManyToOne(() => Mecanico)
        @JoinColumn({ name: 'mecanico_id' })
        mecanico: Mecanico;
        @Column({ type: 'enum', enum: EstadoOrden, default: EstadoOrden.ABIERTA })
        estado: EstadoOrden;
        @CreateDateColumn({ name: 'fecha_apertura' })
        fechaApertura: Date;
        @Column({ name: 'fecha_cierre', type: 'timestamp', nullable: true })
        fechaCierre: Date;
        @OneToMany(() => DetalleOrdenRepuesto, (detalle) => detalle.ordenServicio, { cascade: true })
        detalles: DetalleOrdenRepuesto[];
    
    }
