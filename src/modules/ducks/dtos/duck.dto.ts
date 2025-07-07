import { Exclude, Expose } from 'class-transformer';

export class DuckDto {
  @Expose()
  _id: string;

  @Expose()
  color: string;

  @Expose()
  size: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Exclude()
  createdAt?: Date;

  @Exclude()
  updatedAt?: Date;

  @Exclude()
  isErased?: boolean;
}
