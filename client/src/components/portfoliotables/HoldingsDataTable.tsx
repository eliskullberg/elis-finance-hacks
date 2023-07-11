import { Holding } from "../../interfaces/interfaces";
import {
  DataGrid,
  GridColDef,
  GridValueFormatterParams,
  GridCellParams,
} from "@mui/x-data-grid";
import {
  formatTotalPrice,
  formatUnitPrice,
  formatPercentage,
} from "../../helpers/stringFormat";
import Box from "@mui/material/Box";
import clsx from "clsx";
import TotalsFooter from "./TotalsFooter";

type Props = {
  holdings: Holding[];
};

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    value: number;
  }
}

const unitPriceFormatter = (params: GridValueFormatterParams) => {
  return formatUnitPrice(params.value);
};

const totalValueFormatter = (params: GridValueFormatterParams) => {
  return formatTotalPrice(params.value);
};

const percentageFormatter = (params: GridValueFormatterParams) => {
  return formatPercentage(params.value);
};

const percentageCellStyler = (params: GridCellParams<any, number>) => {
  if (params.value == null) {
    return "";
  }
  return clsx("data-cell", {
    negative: params.value < 1,
    positive: params.value > 1,
  });
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    width: 250,
  },
  {
    field: "pricePerUnit",
    headerName: "Price",
    valueFormatter: unitPriceFormatter,
    flex: 1,
    minWidth: 80,
  },
  {
    field: "totalPurchasePrice",
    headerName: "Purch",
    valueFormatter: totalValueFormatter,
    flex: 1,
    minWidth: 80,
  },
  {
    field: "totalMarketValue",
    headerName: "Market",
    valueFormatter: totalValueFormatter,
    flex: 1,
    minWidth: 80,
  },
  {
    field: "totalPerformanceSincePurchase",
    headerName: "PTOT",
    valueFormatter: percentageFormatter,
    cellClassName: percentageCellStyler,
    flex: 1,
    minWidth: 80,
  },
  {
    field: "developmentOneMonth",
    headerName: "P1M",
    valueFormatter: percentageFormatter,
    cellClassName: percentageCellStyler,
    flex: 1,
    minWidth: 80,
  },
  {
    field: "developmentOneYear",
    headerName: "P1Y",
    valueFormatter: percentageFormatter,
    cellClassName: percentageCellStyler,
    flex: 1,
    minWidth: 80,
  },
];

function HoldingsDataTable(props: Props) {
  return (
    <Box
      minWidth={900}
      sx={{
        "& .data-cell.negative": {
          color: "red",
        },
        "& .data-cell.positive": {
          color: "green",
        },
      }}
    >
      <DataGrid
        getRowId={(row) => row.name}
        rows={props.holdings}
        columns={columns}
        hideFooter={false}
        initialState={{
          sorting: {
            sortModel: [{ field: "totalMarketValue", sort: "desc" }],
          },
        }}
        slots={{
          footer: TotalsFooter,
        }}
        slotProps={{
          footer: {
            value: props.holdings.reduce((acc, curr) => {
              if (curr.totalMarketValue) {
                return acc + curr.totalMarketValue;
              } else return 0;
            }, 0),
          },
        }}
      />
    </Box>
  );
}

export default HoldingsDataTable;
