import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { SizeEnum } from '../../../common/enums/size.enum';

export class CreateDuckDto {
  @IsMongoId()
  duckId: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsString()
  @IsEnum(SizeEnum)
  @IsNotEmpty()
  size: SizeEnum;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
