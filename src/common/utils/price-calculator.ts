export class PriceCalculator {
  static calculate(
    order,
    packageType,
    shippingType,
  ): { total: number; discounts: string; increments: string } {
    let total = order.amountDucks * 10;
    let discounts = '';
    let increments = '';

    // Discount
    if (order.amountDucks > 100) {
      discounts += `Descuento por cantidad: -${total * 0.2} (20%)\n`;
      total -= total * 0.2;
    }

    // increment package type
    if (packageType === 'wood') {
      increments += `Incremento por paquete de madera: +${total * 0.05} (5%)\n`;
      total += total * 0.05;
    } else if (packageType === 'plastic') {
      increments += `Incremento por paquete de plástico: +${total * 0.1} (10%)\n`;
      total += total * 0.1;
    } else if (packageType === 'cardboard') {
      discounts += `Descuento por paquete de cartón: -${total * 0.01} (1%)\n`;
      total -= total * 0.01;
    }

    // Increment by Country destination
    if (order.destinyCountry === 'USA') {
      increments += `Incremento por destino a USA: +${total * 0.18} (18%)\n`;
      total += total * 0.18;
    } else if (order.destinyCountry === 'Bolivia') {
      increments += `Incremento por destino a Bolivia: +${total * 0.13} (13%)\n`;
      total += total * 0.13;
    } else if (order.destinyCountry === 'India') {
      increments += `Incremento por destino a India: +${total * 0.19} (19%)\n`;
      total += total * 0.19;
    } else {
      increments += `Incremento por destino internacional: +${total * 0.15} (15%)\n`;
      total += total * 0.15;
    }

    // 4. Increment by type shipping
    if (shippingType === 'sea') {
      increments += `Incremento por envío marítimo: +400 USD\n`;
      total += 400;
    } else if (shippingType === 'land') {
      increments += `Incremento por envío terrestre: +${10 * order.amountDucks} USD\n`;
      total += 10 * order.amountDucks;
    } else if (shippingType === 'air') {
      increments += `Incremento por envío aéreo: +${30 * order.amountDucks} USD\n`;
      total += 30 * order.amountDucks;

      // Discount in 1000 units 15%
      if (order.amountDucks > 1000) {
        discounts += `Descuento aéreo por más de 1000 unidades: -${total * 0.15} (15%)\n`;
        total -= total * 0.15;
      }
    }

    return { total, discounts, increments };
  }
}
