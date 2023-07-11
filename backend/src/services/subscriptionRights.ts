import {
  AvanzaStockResponse,
  SubscriptionRight,
  subscriptionRightConfig,
  FinancialInstrument
} from '../interfaces/interfaces';
import { getStockData } from './securities';

export async function getSubscriptionRightData(
  rights: subscriptionRightConfig
): Promise<SubscriptionRight[]> {
  const rightData = await Promise.all(
    rights.rights.map(async (r) => {
      const rightData: FinancialInstrument = await getStockData(r.avanzaId);
      const parentStockData: FinancialInstrument = await getStockData(
        r.parentStockAvanzaId
      );
      const calculatedRight: SubscriptionRight = {
        name: rightData.name,
        avanzaId: rightData.avanzaId,
        subscriptionPrice: r.subscriptionPrice,
        terms: r.rightsPerExistingShare + ':' + r.rightsNeededToBuyNewShare,
        currentPrice: rightData.marketPricePerInstrument,
        currentParentStockPrice: parentStockData.marketPricePerInstrument,
        calculatedValue:
          (parentStockData.marketPricePerInstrument - r.subscriptionPrice) /
          r.rightsNeededToBuyNewShare
      };
      return calculatedRight;
    })
  );
  return rightData;
}
