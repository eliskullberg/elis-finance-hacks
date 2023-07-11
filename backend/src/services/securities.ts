import {
  AvanzaStockResponse,
  AvanzaFundResponse,
  FinancialInstrument
} from '../interfaces/interfaces';
import axios from 'axios';

export async function getStockData(avanzaId: number) {
  const avanzaRaw: AvanzaStockResponse = (
    await axios.get(`https://www.avanza.se/_api/market-guide/stock/${avanzaId}`)
  ).data;
  const instrument: FinancialInstrument = {
    avanzaId,
    currency: avanzaRaw.listing.currency,
    type: 'stock',
    marketPricePerInstrument: avanzaRaw.quote.last,
    name: avanzaRaw.name,
    developmentOneMonth:
      avanzaRaw.quote.last / avanzaRaw.historicalClosingPrices.oneMonth,
    developmentThreeMonths:
      avanzaRaw.quote.last / avanzaRaw.historicalClosingPrices.threeMonths,
    developmentOneYear:
      avanzaRaw.quote.last / avanzaRaw.historicalClosingPrices.oneYear
  };
  return instrument;
}

export async function getFundData(avanzaId: number) {
  const avanzaRaw: AvanzaFundResponse = (
    await axios.get(`https://www.avanza.se/_api/fund-guide/guide/${avanzaId}`)
  ).data;
  const instrument: FinancialInstrument = {
    avanzaId,
    currency: avanzaRaw.currency,
    type: 'fund',
    marketPricePerInstrument: avanzaRaw.nav,
    name: avanzaRaw.name,
    developmentOneMonth: 1 + avanzaRaw.developmentOneMonth / 100,
    developmentThreeMonths: 1 + avanzaRaw.developmentThreeMonths / 100,
    developmentOneYear: 1 + avanzaRaw.developmentOneYear / 100
  };
  return instrument;
}

export async function getCertificateData(avanzaId: number) {
  const avanzaRaw: AvanzaStockResponse = (
    await axios.get(
      `https://www.avanza.se/_api/market-guide/certificate/${avanzaId}`
    )
  ).data;
  const instrument: FinancialInstrument = {
    avanzaId,
    currency: avanzaRaw.listing.currency,
    type: 'certificate',
    marketPricePerInstrument: avanzaRaw.quote.last,
    name: avanzaRaw.name,
    developmentOneMonth:
      avanzaRaw.quote.last / avanzaRaw.historicalClosingPrices.oneMonth,
    developmentThreeMonths:
      avanzaRaw.quote.last / avanzaRaw.historicalClosingPrices.threeMonths,
    developmentOneYear:
      avanzaRaw.quote.last / avanzaRaw.historicalClosingPrices.oneYear
  };
  return instrument;
}
