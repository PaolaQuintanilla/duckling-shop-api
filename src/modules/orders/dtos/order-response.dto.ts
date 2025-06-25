export class OrderResponseDto {
  // readonly _id: string;
  readonly color: string;
  readonly size: string;
  readonly amountDucks: number;
  readonly destinyCountry: string;
  readonly shippingType: string;
  readonly packageType: string;
  readonly filler: string;
  readonly totalToPay: number;
  readonly discountsDetails: string;
  readonly incrementsDetails: string;

  constructor(
    // _id: string,
    color: string,
    size: string,
    amountDucks: number,
    destinyCountry: string,
    shippingType: string,
    packageType: string,
    filler: string,
    totalToPay: number,
    discountsDetails: string,
    incrementsDetails: string,
  ) {
    // this._id = _id;
    this.color = color;
    this.size = size;
    this.amountDucks = amountDucks;
    this.destinyCountry = destinyCountry;
    this.shippingType = shippingType;
    this.packageType = packageType;
    this.filler = filler;
    this.totalToPay = totalToPay;
    this.discountsDetails = discountsDetails;
    this.incrementsDetails = incrementsDetails;
  }
}
