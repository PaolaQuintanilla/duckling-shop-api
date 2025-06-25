import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ShippingType } from '../enums/shipping-type.enum';

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

  @IsEnum(ShippingType)
  @IsNotEmpty()
  shippingType: string;
}
