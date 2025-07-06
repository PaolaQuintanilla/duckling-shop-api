import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ShippingTypeEnum } from '../../../common/enums/shipping-type.enum';

export type OrderDocument = Order & Document;

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  duckId: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  amountDucks: number;

  @Prop({ required: true })
  destinyCountry: string;

  @Prop({ required: true, enum: ShippingTypeEnum })
  shippingType: ShippingTypeEnum;

  @Prop({ required: true })
  packageType: string;

  @Prop({ required: true })
  filler: string;

  @Prop({ required: true })
  discounts: number;

  @Prop({ required: true })
  increments: number;

  @Prop({ required: true })
  finalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
