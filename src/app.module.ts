import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DucksModule } from './modules/ducks/ducks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    DucksModule,
    MongooseModule.forRoot('mongodb://localhost:27017/ducks_db'),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
