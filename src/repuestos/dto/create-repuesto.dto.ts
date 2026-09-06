import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRepuestoDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

}
