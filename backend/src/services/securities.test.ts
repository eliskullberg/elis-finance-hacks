import axios from 'axios';
import { getCertificateData, getFundData, getStockData } from './securities';

jest.mock('axios');

it('returns transformed stock data', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      orderbookId: '569319',
      name: 'Starbreeze A',
      isin: 'SE0007158928',
      instrumentId: '566859',
      sectors: [
        { sectorId: '102', sectorName: 'Spelutvecklare' },
        { sectorId: '56', sectorName: 'Mjukvara' },
        { sectorId: '38', sectorName: 'Teknologi' }
      ],
      tradable: 'BUYABLE_AND_SELLABLE',
      listing: {
        shortName: 'STAR A',
        tickerSymbol: 'STAR A',
        countryCode: 'SE',
        currency: 'SEK',
        marketPlaceCode: 'XSTO',
        marketPlaceName: 'Stockholmsbörsen',
        marketListName: 'Small Cap Stockholm',
        tickSizeListId: '28',
        marketTradesAvailable: true
      },
      historicalClosingPrices: {
        oneDay: 0.836,
        oneWeek: 0.818,
        oneMonth: 0.87,
        threeMonths: 1.8,
        startOfYear: 1.555,
        oneYear: 0.87,
        threeYears: 0.968,
        fiveYears: 6.91,
        start: 11.09,
        startDate: '2015-06-11'
      },
      keyIndicators: {
        numberOfOwners: 6305,
        reportDate: '2023-05-08',
        directYield: 0.0,
        volatility: 0.6204,
        beta: 0.6178,
        priceEarningsRatio: -18.29,
        priceSalesRatio: 8.5,
        interestCoverageRatio: 0.084,
        returnOnEquity: 0.161,
        returnOnTotalAssets: -0.0719,
        equityRatio: 0.0408,
        capitalTurnover: 0.1699,
        operatingProfitMargin: 0.0387,
        grossMargin: 0.523,
        netMargin: -0.4235,
        marketCapital: { value: 1120856867.0, currency: 'SEK' },
        equityPerShare: { value: 0.02, currency: 'SEK' },
        turnoverPerShare: { value: 0.1, currency: 'SEK' },
        earningsPerShare: { value: -0.05, currency: 'SEK' },
        dividend: {
          exDate: '2023-05-12',
          amount: 0.0,
          currencyCode: 'SEK',
          exDateStatus: 'HISTORICAL'
        },
        dividendsPerYear: 1,
        nextReport: { date: '2023-08-17', reportType: 'INTERIM' },
        previousReport: { date: '2023-05-08', reportType: 'INTERIM' }
      },
      quote: {
        buy: 0.83,
        sell: 0.836,
        last: 0.8,
        highest: 0.836,
        lowest: 0.8,
        change: -0.036,
        changePercent: -4.31,
        spread: 0.72,
        timeOfLast: 1688988904000,
        totalValueTraded: 11199.91,
        totalVolumeTraded: 13444,
        updated: 1688991573260,
        volumeWeightedAveragePrice: 0.833
      },
      type: 'STOCK'
    }
  });

  const stock = await getStockData(569319);
  expect(stock).toEqual({
    avanzaId: 569319,
    currency: 'SEK',
    developmentOneMonth: 0.9195402298850576,
    developmentOneYear: 0.9195402298850576,
    developmentThreeMonths: 0.4444444444444445,
    marketPricePerInstrument: 0.8,
    name: 'Starbreeze A',
    type: 'stock'
  });
});

it('returns transformed fund data', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      isin: 'SE0005188836',
      name: 'Länsförsäkringar Global Index',
      description:
        'Fonden är en indexfond som placerar i globalt i aktier inom olika branscher. Målsättningen är att efterlikna utvecklingen på de globala aktiermarknaderna som fonden placerar på. Fonden kommer att ha en aktieexponering som är minst 90 procent av fondens tillgångar.',
      nav: 389.4477,
      navDate: '2023-07-07T00:00:00',
      currency: 'SEK',
      rating: 4,
      productFee: 0.22,
      managementFee: 0.2,
      risk: 4,
      riskText: 'Medel',
      developmentOneDay: -1.40689,
      developmentOneMonth: 2.02891,
      developmentThreeMonths: 10.57193,
      developmentSixMonths: 17.99089,
      developmentOneYear: 18.78443,
      developmentThisYear: 20.77512,
      developmentThreeYears: 59.970907,
      developmentFiveYears: 88.910452,
      lowCarbon: true,
      indexFund: true,
      sharpeRatio: 1.23,
      standardDeviation: 14.099999999999998,
      capital: 6.4574128765e10,
      startDate: '2013-06-11',
      fundManagers: [
        { name: 'Peter Svalstedt', startDate: '2022-05-23' },
        { name: 'Pontus Englund', startDate: '2022-05-23' }
      ],
      adminCompany: {
        name: 'Länsförsäkringar',
        country: 'Sverige',
        url: 'http://www.lansforsakringar.se'
      },
      pricingFrequency: 'Dagligen',
      prospectusLink: '/_api/fund-reference/reference/417655/prospectus',
      aumCoveredCarbon: 99.51,
      fossilFuelInvolvement: 4.02,
      carbonRiskScore: 5.73,
      categories: ['Global', 'Mix bolag'],
      fundTypeName: 'Aktiefond',
      fundType: 'EQUITY_FUND',
      primaryBenchmark: 'Morningstar DM TME PAB Sel NR USD',
      hedgeFund: false,
      ucitsFund: true,
      recommendedHoldingPeriod: 'Minst 5 år',
      portfolioDate: '2023-06-30',
      ppmCode: '658997',
      superloanOrderbook: true,
      esgScore: 20.32,
      environmentalScore: 3.67,
      socialScore: 9.32,
      governanceScore: 7.43,
      controversyScore: null,
      carbonSolutionsInvolvement: 15.73,
      sustainabilityRating: 3,
      sustainabilityRatingCategoryName: 'Aktier, globalt stora bolag',
      svanen: false,
      fundRatingViews: [
        {
          date: '2023-06-30T00:00:00',
          fundRatingType: 'THREE_YEARS',
          fundRating: 4
        },
        {
          date: '2023-06-30T00:00:00',
          fundRatingType: 'FIVE_YEARS',
          fundRating: 4
        },
        {
          date: '2023-06-30T00:00:00',
          fundRatingType: 'TEN_YEARS',
          fundRating: 4
        },
        {
          date: '2023-06-30T00:00:00',
          fundRatingType: 'ALL_TIME',
          fundRating: 4
        }
      ]
    }
  });

  const stock = await getFundData(417655);
  expect(stock).toEqual({
    avanzaId: 417655,
    currency: 'SEK',
    developmentOneMonth: 1.0202891,
    developmentOneYear: 1.1878443,
    developmentThreeMonths: 1.1057193,
    marketPricePerInstrument: 389.4477,
    name: 'Länsförsäkringar Global Index',
    type: 'fund'
  });
});

it('returns transformed certificate data', async () => {
  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      orderbookId: '563966',
      name: 'BITCOIN XBT',
      isin: 'SE0007126024',
      tradable: 'BUYABLE_AND_SELLABLE',
      listing: {
        shortName: 'BITCOIN XBT',
        tickerSymbol: 'BITCOIN XBT',
        countryCode: 'SE',
        currency: 'SEK',
        marketPlaceCode: 'FNSE',
        marketPlaceName: 'First North Stockholm',
        tickSizeListId: '216',
        marketTradesAvailable: true
      },
      historicalClosingPrices: {
        oneDay: 1507.72,
        oneWeek: 1486.32,
        oneMonth: 1297.17,
        threeMonths: 1320.13,
        startOfYear: 736.16,
        oneYear: 1040.97,
        threeYears: 396.0,
        fiveYears: 280.0,
        start: 9.73,
        startDate: '2015-05-18'
      },
      keyIndicators: {
        leverage: 1.0,
        productLink: 'https://etp.morganstanley.com/SE/SV/product-details/',
        numberOfOwners: 37928,
        isAza: false
      },
      quote: {
        buy: 1496.32,
        sell: 1500.6,
        last: 1496.3,
        highest: 1504.15,
        lowest: 1485.58,
        change: -11.42,
        changePercent: -0.76,
        spread: 0.29,
        timeOfLast: 1688994486000,
        totalValueTraded: 7184531.46,
        totalVolumeTraded: 4809,
        updated: 1688994821480,
        volumeWeightedAveragePrice: 1493.98
      },
      type: 'CERTIFICATE'
    }
  });

  const stock = await getCertificateData(563966);
  expect(stock).toEqual({
    avanzaId: 563966,
    currency: 'SEK',
    developmentOneMonth: 1.1535111049438391,
    developmentOneYear: 1.437409339366168,
    developmentThreeMonths: 1.1334489785096922,
    marketPricePerInstrument: 1496.3,
    name: 'BITCOIN XBT',
    type: 'certificate'
  });
});
