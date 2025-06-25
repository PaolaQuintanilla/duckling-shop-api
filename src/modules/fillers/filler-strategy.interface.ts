export interface FillerStrategy {
  getFiller(packageType: string, shippingType: string): string;
}
