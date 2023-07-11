type FinancialInstrumentType = 'stock' | 'fund' | 'certificate' | 'bankAccount';

export interface AvanzaStockResponse {
  name: string;
  quote: {
    last: number;
  };
  listing: {
    currency: string;
  };
  historicalClosingPrices: {
    oneMonth: number;
    threeMonths: number;
    oneYear: number;
  };
}

export interface AvanzaFundResponse {
  name: string;
  nav: number;
  developmentOneMonth: number;
  developmentThreeMonths: number;
  developmentOneYear: number;
  currency: string;
}

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

export interface StaticPortfolioInfo {
  financialInstruments: {
    avanzaId: number;
    type: string;
    totalPurchasePrice: number;
    numberOwned: number;
    currency: string;
  }[];
  bankAccounts: {
    name: string;
    type: string;
    value: number;
    interestRate: number;
    currency: string;
  }[];
}

export interface subscriptionRightConfigItem {
  avanzaId: number;
  parentStockAvanzaId;
  subscriptionPrice: number;
  rightsPerExistingShare: number;
  rightsNeededToBuyNewShare: number;
}

export interface subscriptionRightConfig {
  rights: subscriptionRightConfigItem[];
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
