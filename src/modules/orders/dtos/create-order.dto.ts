import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsInt()
  @IsNotEmpty()
  amountDucks: number;

  @IsNotEmpty()
  @IsString()
  destinyCountry: string;

  @IsEnum(['land', 'air', 'sea'])
  @IsNotEmpty()
  shippingType: string;
}
