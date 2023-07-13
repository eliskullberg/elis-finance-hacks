import { useState, useEffect, useContext } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  ServerPortfolioResponse,
  Holding,
  ServerPortfolioTotalsResponse,
  Portfolio,
} from "../interfaces/interfaces";
import HoldingsSummary from "./HoldingsSummary";
import HoldingsDataTable from "./portfoliotables/HoldingsDataTable";
import TableDivider from "./portfoliotables/TableDivider";
import { ApiKeyContext } from "./ApiKeyContext";

function PortfolioSummary() {
  const [state, setState] = useState("new");
  const [portfolioData, setPortfolioData] = useState<Portfolio>({
    stocks: [],
    funds: [],
    certificates: [],
    bankAccounts: [],
  });
  const [holdingsTotals, setHoldingsTotals] =
    useState<ServerPortfolioTotalsResponse | null>(null);
  const { apiKey, setApiKey } = useContext(ApiKeyContext);
  const portfolioBaseUrl =
    "https://boreal-antonym-390612.ew.r.appspot.com/api/portfolio/";

  async function getPortfolioData(): Promise<
    ServerPortfolioResponse | undefined
  > {
    try {
      const config = {
        headers: {
          "x-api-key": apiKey,
        },
      };
      const portfolioRaw = await axios.get(portfolioBaseUrl, config);
      const pd: ServerPortfolioResponse = portfolioRaw.data;
      return pd;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (state === "new") {
      setState("loading");
      getPortfolioData().then((data) => {
        if (data) {
          setHoldingsTotals(data.totals);
          setPortfolioData(mapToHoldingsData(data));
          setState("ready");
        } else {
          setState("error");
        }
      });
    }
  }, [state]);

  // TODO: FIX any-type
  function mapToHoldingsData(
    rawData: ServerPortfolioResponse | undefined
  ): any {
    if (!rawData) {
      return [];
    }
    const instruments: Holding[] = rawData.financialInstruments.map((e) => {
      return {
        name: e.instrument.name,
        type: e.instrument.type,
        pricePerUnit: e.instrument.marketPricePerInstrument,
        totalPurchasePrice: e.totalPurchasePrice,
        totalMarketValue: e.marketPriceTotal,
        totalPerformanceSincePurchase: e.performanceSincePurchase,
        developmentOneMonth: e.instrument.developmentOneMonth,
        developmentThreeMonths: e.instrument.developmentThreeMonths,
        developmentOneYear: e.instrument.developmentOneYear,
      };
    });
    const bankAccountHoldings: Holding[] = rawData.bankAccounts.map((e) => {
      return {
        name: e.name,
        type: "bankAccount",
        totalPurchasePrice: e.balance,
        totalMarketValue: e.balance,
        developmentOneYear: e.interestRate,
      };
    });
    return {
      stocks: instruments.filter((i) => i.type === "stock"),
      funds: instruments.filter((i) => i.type === "fund"),
      certificates: instruments.filter((i) => i.type === "certificate"),
      bankAccounts: bankAccountHoldings,
    };
  }

  if (state === "loading" || state == "new") {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else if (state === "ready") {
    return (
      <>
        <HoldingsSummary totals={holdingsTotals} />
        <TableDivider text="Stocks and certificates" />
        <HoldingsDataTable
          holdings={[...portfolioData.stocks, ...portfolioData.certificates]}
        />
        <TableDivider text="Funds" />
        <HoldingsDataTable holdings={portfolioData.funds} />
        <TableDivider text="Bank Accounts" />

        <HoldingsDataTable holdings={portfolioData.bankAccounts} />
      </>
    );
  } else {
    return <>Data loading error</>;
  }
}

export default PortfolioSummary;
