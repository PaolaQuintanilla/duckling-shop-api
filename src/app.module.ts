import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DucksModule } from './modules/ducks/ducks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DucksModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ducks_db'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
