import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShippingType } from '../enums/shipping-type.enum';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ select: false })
  _id: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  amountDucks: number;

  @Prop({ required: true })
  destinyCountry: string;

  @Prop({ required: true, enum: ShippingType })
  shippingType: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
