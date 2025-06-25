import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Duck extends Document {
  @Prop({ required: true })
  color: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  isErased: boolean;
}

export const DuckSchema = SchemaFactory.createForClass(Duck);
