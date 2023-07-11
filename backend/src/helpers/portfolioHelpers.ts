import {
  FinancialInstrument,
  FinancialInstrumentHolding
} from '../interfaces/interfaces';

// TODO Typings (this "works" but shouldn't)
export const holdingsPurchPriceReducer = (acc, curr) => {
  return (
    acc + (curr.totalPurchasePrice ? curr.totalPurchasePrice : curr.balance)
  );
};

// TODO Typings (this "works" but shouldn't)
export const holdingsMarketPriceReducer = (acc, curr) => {
  return acc + (curr.marketPriceTotal ? curr.marketPriceTotal : curr.balance);
};

export const mapAvanzaDataToInstruments = (instrument, avanzaData) => {
  const avanzaInstrumentData: FinancialInstrument = avanzaData.filter(
    (e) => e.avanzaId === instrument.avanzaId
  )[0];

  const marketPriceTotal =
    instrument.numberOwned * avanzaInstrumentData.marketPricePerInstrument;
  return {
    instrument: avanzaInstrumentData,
    totalPurchasePrice: instrument.totalPurchasePrice,
    numberOwned: instrument.numberOwned,
    marketPriceTotal,
    performanceSincePurchase: marketPriceTotal / instrument.totalPurchasePrice
  };
};

export const convertInstrumentsToSek = (
  instuments: FinancialInstrumentHolding[]
): FinancialInstrumentHolding[] => {
  const eurToSek = 11.88;
  return instuments.map((i) => {
    if (i.instrument.currency === 'EUR') {
      return {
        ...i,
        totalPurchasePrice: i.totalPurchasePrice * eurToSek,
        marketPriceTotal: i.marketPriceTotal * eurToSek
      };
    } else return i;
  });
};
