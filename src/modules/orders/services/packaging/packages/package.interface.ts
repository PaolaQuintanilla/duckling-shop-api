export abstract class Package {
  abstract getPackagingType(): string;
  abstract getFiller(shippingType: string): string;
}
