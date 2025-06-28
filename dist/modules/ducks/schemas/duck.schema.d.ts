import { Document } from 'mongoose';
import { ColorEnum } from '../../../common/enums/color.enum';
export declare class Duck extends Document {
    color: ColorEnum;
    size: string;
    quantity: number;
    price: number;
    isErased: boolean;
}
export declare const DuckSchema: import("mongoose").Schema<Duck, import("mongoose").Model<Duck, any, any, any, Document<unknown, any, Duck, any> & Duck & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Duck, Document<unknown, {}, import("mongoose").FlatRecord<Duck>, {}> & import("mongoose").FlatRecord<Duck> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
