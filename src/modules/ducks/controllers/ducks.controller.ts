import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { DucksService } from '../services/ducks.service';
import { CreateDuckDto } from '../dtos/create-duck.dto';
import { UpdateDuckDto } from '../dtos/update-duck.dto';

@Controller('ducks')
export class DucksController {
  constructor(private readonly ducksService: DucksService) {}

  @Post()
  create(@Body() dto: CreateDuckDto) {
    return this.ducksService.create(dto);
  }

  @Get()
  findAll() {
    return this.ducksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ducksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDuckDto) {
    return this.ducksService.update(id, dto);
  }

  @Patch(':id/erase')
  async eraseDuck(@Param('id') id: string) {
    const duck = await this.ducksService.softDeleteDuck(id);
    return { message: `Duck with id ${id} has been marked as erased`, duck };
  }
}
// http type exceptions for controllers
