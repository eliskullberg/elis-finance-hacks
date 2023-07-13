import { Dispatch, SetStateAction } from "react";

type FinancialInstrumentType = "stock" | "fund" | "certificate" | "bankAccount";

export interface BankAccountHolding {
  name: string;
  interestRate: number;
  balance: number;
}

export interface FinancialInstrument {
  avanzaId: number;
  currency: string;
  type: FinancialInstrumentType;
  marketPricePerInstrument: number;
  name: string;
  developmentOneMonth: number;
  developmentThreeMonths: number;
  developmentOneYear: number;
}

export interface FinancialInstrumentHolding {
  instrument: FinancialInstrument;
  totalPurchasePrice: number;
  numberOwned: number;
  marketPriceTotal: number;
  performanceSincePurchase: number;
}

export interface Holding {
  name: string;
  type: "certificate" | "stock" | "fund" | "bankAccount";
  pricePerUnit?: number;
  totalPurchasePrice?: number;
  totalMarketValue?: number;
  totalPerformanceSincePurchase?: number | null;
  developmentOneMonth?: number | null;
  developmentThreeMonths?: number | null;
  developmentOneYear?: number;
}

export interface IApiKeyContext {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
}

export interface Portfolio {
  stocks: Holding[];
  funds: Holding[];
  certificates: Holding[];
  bankAccounts: Holding[];
}

export interface ServerPortfolioResponse {
  financialInstruments: FinancialInstrumentHolding[];
  bankAccounts: BankAccountHolding[];
  totals: ServerPortfolioTotalsResponse;
}

export interface ServerPortfolioTotalsResponse {
  holdingsPurchasePrice: number;
  holdingsMarketValue: number;
  holdingsPerformanceSincePurchase: number;
}

export interface ServerSubscriptionRightResponse {
  rights: SubscriptionRight[];
}

export interface SubscriptionRight {
  name: string;
  avanzaId: number;
  subscriptionPrice: number;
  terms: string;
  currentPrice: number;
  currentParentStockPrice: number;
  calculatedValue: number;
}
