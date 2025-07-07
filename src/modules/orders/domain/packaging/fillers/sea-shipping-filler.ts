import { FillerStrategy } from './filler-strategy.interface';

export class SeaShippingFiller implements FillerStrategy {
  getFiller(): string {
    return 'Moisture-absorbing beads and bubble wrap bags';
  }
}
