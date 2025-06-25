export interface IPriceCalculator {
  calculate(
    order,
    packageType,
    shippingType,
  ): { total: number; discounts: string; increments: string };
}
