import { ShippingTypeEnum } from 'src/common/enums/shipping-type.enum';
import { SizeEnum } from 'src/common/enums/size.enum';
import { Result } from 'src/common/Result';
import { PackageFactory } from '../packaging/packages/package-factory';
import { FillerFactory } from '../packaging/fillers/filler-factory';
import { Package } from '../packaging/packages/package.interface';
import { FillerStrategy } from '../packaging/fillers/filler-strategy.interface';
import { Pricing } from './Pricing';

export class OrderEntity {
  private constructor(
    private readonly _color: string,
    private readonly _size: SizeEnum,
    private readonly _amountDucks: number,
    private readonly _destinyCountry: string,
    private readonly _package: Package,
    private readonly _filler: string,
    private readonly _shippingType: ShippingTypeEnum,
    private readonly _id?: string,
    private readonly _discounts?: number,
    private readonly _increments?: number,
    private readonly _finalPrice?: number,
  ) {}

  static create(props: {
    duckId: string;
    color: string;
    size: SizeEnum;
    amountDucks: number;
    destinyCountry: string;
    shippingType: ShippingTypeEnum;
    price: number;
  }): Result<OrderEntity, Error> {
    const {
      duckId,
      size,
      shippingType,
      color,
      amountDucks,
      destinyCountry,
      price,
    } = props;
    if (amountDucks <= 0) {
      return Result.failure({
        name: 'Order.AmountInvalid',
        message: 'Amount of ducks must be greater than zero',
      });
    }

    if (!destinyCountry) {
      return Result.failure({
        name: 'Order.CountryInvalid',
        message: 'Destiny country is required',
      });
    }

    // if (duck.color !== color || duck.size !== size) {
    //     this.exception.badRequestException(
    //         'The provided color or size do not match the duck.',
    //     );
    // }

    const packageDuck: Package = PackageFactory.createPackage(size);
    const fillerStrategy: FillerStrategy =
      FillerFactory.getFillerStrategy(shippingType);
    const filler: string = fillerStrategy.getFiller(
      packageDuck.getPackagingType(),
      shippingType,
    );

    const { discounts, increments, finalPrice } = Pricing.calculate(
      price,
      amountDucks,
      packageDuck.getPackagingType(),
      destinyCountry,
      shippingType,
    );

    const order = new OrderEntity(
      color,
      size,
      amountDucks,
      destinyCountry,
      packageDuck,
      filler,
      shippingType,
      duckId,
      discounts,
      increments,
      finalPrice,
    );

    return Result.success(order);
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get color(): string {
    return this._color;
  }

  public get size(): SizeEnum {
    return this._size;
  }

  public get amountDucks(): number {
    return this._amountDucks;
  }

  public get destinyCountry(): string {
    return this._destinyCountry;
  }

  public get package(): Package {
    return this._package;
  }

  public get filler(): string {
    return this._filler;
  }
  public get increments(): number {
    return this._increments;
  }
  public get discount(): number {
    return this._discounts;
  }
  public get finalPrice(): number {
    return this._finalPrice;
  }

  public get shippingType(): ShippingTypeEnum {
    return this._shippingType;
  }
}
