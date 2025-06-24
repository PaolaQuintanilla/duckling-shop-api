import { Module } from '@nestjs/common';
import { DucksController } from './controllers/ducks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Duck, DuckSchema } from './schemas/duck.schema';
import { DucksService } from './services/ducks.service';
import { DuckRepository } from './repositories/duck.repository';

@Module({
  imports: [
    DucksModule,
    MongooseModule.forFeature([{ name: Duck.name, schema: DuckSchema }]),
  ],
  controllers: [DucksController],
  providers: [DucksService, DuckRepository],
})
export class DucksModule {}
