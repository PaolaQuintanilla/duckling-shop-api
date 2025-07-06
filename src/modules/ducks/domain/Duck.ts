import { ColorEnum } from './color.enum';
import { Result } from './Result';

export class DuckEntity {
  private constructor(
    public readonly color: ColorEnum,
    public readonly size: string,
    private _quantity: number,
    private _price: number,
    public readonly id?: string,
    private _isErased = false,
  ) {}

  static createDuck(props: {
    color: ColorEnum;
    size: string;
    quantity: number;
    price: number;
  }): Result<DuckEntity, Error> {
    if (props.quantity < 0) {
      return Result.failure({
        name: 'Duck.Price',
        message: 'Price: Quantity cannot be negative',
      });
    }

    if (!props.size) {
      return Result.failure({
        name: 'Duck.Price',
        message: 'Price: Quantity cannot be negative',
      });
    }

    if (props.price < 0) {
      return Result.failure({
        name: 'INVALID_PRICE',
        message: 'Price cannot be negative',
      });
    }

    const duck = new DuckEntity(
      props.color,
      props.size,
      props.quantity,
      props.price,
    );
    return Result.success(duck);
  }

  static hidrate(props: {
    id: string;
    color: ColorEnum;
    size: string;
    quantity: number;
    price: number;
  }) {
    return new DuckEntity(
      props.color,
      props.size,
      props.quantity,
      props.price,
      props.id,
    );
  }

  update(props: {
    color: ColorEnum;
    size: string;
    quantity: number;
    price: number;
  }): Result<DuckEntity, Error> {
    if (props.quantity < 0) {
      return Result.failure({
        name: 'Duck.Price',
        message: 'Price: Quantity cannot be negative',
      });
    }

    if (!props.size) {
      return Result.failure({
        name: 'Duck.Price',
        message: 'Price: Quantity cannot be negative',
      });
    }

    if (props.price < 0) {
      return Result.failure({
        name: 'INVALID_PRICE',
        message: 'Price cannot be negative',
      });
    }

    const duck = new DuckEntity(
      props.color,
      props.size,
      props.quantity,
      props.price,
    );

    return Result.success(duck);
  }

  public get price(): number {
    return this._price;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get isErased(): boolean {
    return this._isErased;
  }
}
