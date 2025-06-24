// create-duck.dto.ts
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDuckDto {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
