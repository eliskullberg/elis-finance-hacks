import { FinancialInstrument } from '../interfaces/interfaces';
import {
  getStockData,
  getFundData,
  getCertificateData
} from '../services/securities';

export async function getStock(req, res) {
  const avanzaId = Number(req.params.avanzaid);
  const stockData: FinancialInstrument = await getStockData(avanzaId);
  res.send(stockData);
}

export async function getFund(req, res) {
  const avanzaId = Number(req.params.avanzaid);
  const fundData = await getFundData(avanzaId);
  res.send(fundData);
}

export async function getCertificate(req, res) {
  const avanzaId = Number(req.params.avanzaid);
  const certificateData = await getCertificateData(avanzaId);
  res.send(certificateData);
}
