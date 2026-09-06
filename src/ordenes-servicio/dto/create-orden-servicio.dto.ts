import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateOrdenServicioDto {
    @IsNotEmpty()
    @IsInt()
    vehiculoId: number;

    @IsNotEmpty()
    @IsInt()
    mecanicoId: number;

}
