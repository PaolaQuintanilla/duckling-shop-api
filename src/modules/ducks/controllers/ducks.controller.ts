import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DucksService } from '../services/ducks.service';
import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';
import { DuckDto } from '../dtos/duck.dto';

@Controller('ducks')
export class DucksController {
  constructor(private readonly ducksService: DucksService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateDuckDto) {
    const duckCreateOrUpdated = await this.ducksService.createOrUpdateDuck(dto);

    return {
      message: 'Duck created successfully',
      id: duckCreateOrUpdated.id,
    };
  }

  @Get()
  @HttpCode(200)
  @HttpCode(500)
  async findAll(): Promise<DuckDto[]> {
    const ducksResponse = await this.ducksService.findAll();
    return ducksResponse;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ducksService.findOne(id);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateDuckDto) {
  //   return this.ducksService.update(id, dto);
  // }

  @Patch(':id/erase')
  async eraseDuck(@Param('id') id: string) {
    const duck = await this.ducksService.softDeleteDuck(id);
    return { message: `Duck with id ${id} has been marked as erased`, duck };
  }
}
