import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsMongoId,
  IsOptional,
} from 'class-validator';
import { SizeEnum } from '../../../common/enums/size.enum';
import { ColorEnum } from '../../../common/enums/color.enum';
import { Transform } from 'class-transformer';

export class CreateDuckDto {
  @IsMongoId()
  @IsOptional()
  duckId: string;

  @IsString()
  @IsEnum(ColorEnum, { message: 'bad color' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase())
  color: ColorEnum;

  @IsString()
  @IsEnum(SizeEnum, { message: 'bad size' })
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase())
  size: SizeEnum;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}
