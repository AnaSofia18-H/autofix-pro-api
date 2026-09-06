import { IsNotEmpty, IsString, IsInt } from 'class-validator';
 
export class CreateModeloDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;
 
  @IsNotEmpty()
  @IsInt()
  marcaId: number;
}
