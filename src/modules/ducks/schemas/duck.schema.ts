import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ColorEnum } from '../../../common/enums/color.enum';
import { SizeEnum } from '../../../common/enums/size.enum';

@Schema({ timestamps: true })
export class Duck extends Document {
  @Prop({ type: String, enum: ColorEnum, required: true })
  color: ColorEnum;

  @Prop({ type: String, enum: SizeEnum, required: true })
  size: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true, default: false })
  isErased: boolean;
}

export const DuckSchema = SchemaFactory.createForClass(Duck);
