import { ServerPortfolioTotalsResponse } from "../interfaces/interfaces";
import { formatTotalPrice, formatPercentage } from "../helpers/stringFormat";

type Props = {
  totals: ServerPortfolioTotalsResponse | null;
};

function HoldingsSummary(props: Props) {
  return (
    <>
      <div>
        Total pruchase value:{" "}
        {props.totals
          ? formatTotalPrice(props.totals.holdingsPurchasePrice)
          : "n/a"}
      </div>
      <div>
        Total market value:{" "}
        {props.totals
          ? formatTotalPrice(props.totals.holdingsMarketValue)
          : "n/a"}
      </div>
      <div>
        Total performance since purchase:{" "}
        {props.totals
          ? formatPercentage(props.totals.holdingsPerformanceSincePurchase)
          : "n/a"}
      </div>
    </>
  );
}

export default HoldingsSummary;
