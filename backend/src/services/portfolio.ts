import {
  StaticPortfolioInfo,
  ServerPortfolioResponse,
  FinancialInstrument,
  FinancialInstrumentHolding,
  BankAccountHolding
} from '../interfaces/interfaces';
import {
  getCertificateData,
  getFundData,
  getStockData
} from '../services/securities';
import {
  holdingsPurchPriceReducer,
  holdingsMarketPriceReducer,
  mapAvanzaDataToInstruments,
  convertInstrumentsToSek
} from '../helpers/portfolioHelpers';

export async function getPortfolioData(
  portfolioConfig: StaticPortfolioInfo
): Promise<ServerPortfolioResponse> {
  const avanzaData: FinancialInstrument[] = await Promise.all(
    portfolioConfig.financialInstruments.map((p) => {
      switch (p.type) {
        case 'stock':
          return getStockData(p.avanzaId);
        case 'fund':
          return getFundData(p.avanzaId);
        case 'certificate':
          return getCertificateData(p.avanzaId);
        default:
          break;
      }
    })
  );

  const financialInstruments: FinancialInstrumentHolding[] =
    portfolioConfig.financialInstruments.map((instrument) =>
      mapAvanzaDataToInstruments(instrument, avanzaData)
    );

  const funancialInstrumentsSek: FinancialInstrumentHolding[] =
    convertInstrumentsToSek(financialInstruments);

  const bankAccounts: BankAccountHolding[] = portfolioConfig.bankAccounts.map(
    (account) => {
      return {
        name: account.name,
        interestRate: account.interestRate,
        balance: account.value
      };
    }
  );

  const holdingsPurchasePrice: number = [
    ...financialInstruments,
    ...bankAccounts
  ].reduce(holdingsPurchPriceReducer, 0);

  const holdingsMarketValue: number = [
    ...financialInstruments,
    ...bankAccounts
  ].reduce(holdingsMarketPriceReducer, 0);

  const totals = {
    holdingsPurchasePrice,
    holdingsMarketValue,
    holdingsPerformanceSincePurchase:
      holdingsMarketValue / holdingsPurchasePrice
  };

  return {
    financialInstruments: funancialInstrumentsSek,
    bankAccounts: bankAccounts,
    totals
  };
}
