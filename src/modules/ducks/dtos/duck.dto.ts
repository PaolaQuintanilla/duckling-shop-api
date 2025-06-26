import { Exclude, Expose } from 'class-transformer';

export class DuckDto {
  @Expose()
  color: string;

  @Expose()
  size: string;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Exclude()
  _id: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  __v: number;

  @Exclude()
  isErased: boolean;
}
