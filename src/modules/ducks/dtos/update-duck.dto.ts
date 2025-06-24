import { PartialType } from '@nestjs/mapped-types';
import { CreateDuckDto } from './create-duck.dto';

export class UpdateDuckDto extends PartialType(CreateDuckDto) {}
