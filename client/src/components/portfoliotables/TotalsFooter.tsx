import Box from "@mui/material/Box";
import { formatTotalPrice } from "../../helpers/stringFormat";
import { Typography } from "@mui/material";

interface Props {
  value: number;
}

export default function TotalsFooter(props: Props) {
  return (
    <Box sx={{ fontStyle: "oblique", m: 1 }}>
      <Typography align="left">
        Total market value: {formatTotalPrice(props.value)}
      </Typography>
    </Box>
  );
}
