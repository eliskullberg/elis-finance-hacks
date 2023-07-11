import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { CardHeader } from "@mui/material";
import Typography from "@mui/material/Typography";
import { SubscriptionRight } from "../interfaces/interfaces";

interface Props {
  right: SubscriptionRight;
}

function RightCard(props: Props) {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardHeader title={props.right.name}></CardHeader>
      <CardContent>
        <Typography variant="body1">
          Subscription price: {props.right.subscriptionPrice}
        </Typography>
        <Typography variant="body1">Terms: {props.right.terms}:</Typography>
        <Typography variant="body1">
          Current price: {props.right.currentPrice}
        </Typography>
        <Typography variant="body1">
          Current parent stock price: {props.right.currentParentStockPrice}
        </Typography>
        <Typography variant="body1">
          Calculated right value: {props.right.calculatedValue.toFixed(4)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Details</Button>
      </CardActions>
    </Card>
  );
}

export default RightCard;
