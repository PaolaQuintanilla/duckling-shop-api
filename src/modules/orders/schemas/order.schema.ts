import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShippingTypeEnum } from '../../../common/enums/shipping-type.enum';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  amountDucks: number;

  @Prop({ required: true })
  destinyCountry: string;

  @Prop({ required: true, enum: ShippingTypeEnum })
  shippingType: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
