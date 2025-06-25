import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ColorEnum } from '../../../common/enums/color.enum';

@Schema({ timestamps: true })
export class Duck extends Document {
  @Prop({ required: true })
  color: ColorEnum;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: false })
  isErased: boolean;
}

export const DuckSchema = SchemaFactory.createForClass(Duck);
