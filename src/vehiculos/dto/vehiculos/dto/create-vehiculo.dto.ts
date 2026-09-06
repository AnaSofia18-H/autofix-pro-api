import { IsNotEmpty, IsString, IsInt } from 'class-validator';
 
export class CreateVehiculoDto {
  @IsNotEmpty()
  @IsString()
  placa: string;
 
  @IsNotEmpty()
  @IsString()
  color: string;
 
  @IsNotEmpty()
  @IsInt()
  anio: number;
 
  @IsNotEmpty()
  @IsInt()
  modeloId: number;
}


