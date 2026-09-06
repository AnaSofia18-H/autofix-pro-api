import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMecanicoDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  especialidad: string;
}
