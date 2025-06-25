import { FillerStrategy } from './filler-strategy.interface';
import { AirShippingFiller } from './air-shipping-filler';
import { LandShippingFiller } from './land-shipping-filler';
import { SeaShippingFiller } from './sea-shipping-filler';
import { BadRequestException } from '@nestjs/common';

export class FillerFactory {
  static getFillerStrategy(shippingType: string): FillerStrategy {
    switch (shippingType) {
      case 'air':
        return new AirShippingFiller();
      case 'land':
        return new LandShippingFiller();
      case 'sea':
        return new SeaShippingFiller();
      default:
        throw new BadRequestException('Shipping type not supported..');
    }
  }
}
