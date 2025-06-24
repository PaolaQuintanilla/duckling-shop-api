import { Module } from '@nestjs/common';
import { DucksModule } from './controllers/ducks/ducks.module';
import { DucksController } from './controllers/ducks/ducks.controller';

@Module({
  imports: [DucksModule],
  controllers: [DucksController]
})
export class DucksModule {}
