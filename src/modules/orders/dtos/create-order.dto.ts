import {
  IsEnum,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ShippingTypeEnum } from '../../../common/enums/shipping-type.enum';
import { SizeEnum } from '../../../common/enums/size.enum';

export class CreateOrderDto {
  @IsMongoId()
  duckId: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsNotEmpty()
  @IsEnum(SizeEnum)
  @IsString()
  size: SizeEnum;

  @IsInt()
  @IsNotEmpty()
  amountDucks: number;

  @IsNotEmpty()
  @IsString()
  destinyCountry: string;

  @IsEnum(ShippingTypeEnum, {
    message: 'Shipping type not supported',
  })
  @IsNotEmpty()
  shippingType: ShippingTypeEnum;
}
