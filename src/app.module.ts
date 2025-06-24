import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DucksModule } from './modules/ducks/ducks.module';

@Module({
  imports: [DucksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
