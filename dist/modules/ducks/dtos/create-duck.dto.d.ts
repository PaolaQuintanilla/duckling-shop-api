import { SizeEnum } from '../../../common/enums/size.enum';
import { ColorEnum } from '../../../common/enums/color.enum';
export declare class CreateDuckDto {
    duckId: string;
    color: ColorEnum;
    size: SizeEnum;
    quantity: number;
    price: number;
}
