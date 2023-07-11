import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface Props {
  text: string;
}

export default function TableDivider(props: Props) {
  return (
    <Box padding={2}>
      <Typography variant="h4">{props.text}</Typography>
    </Box>
  );
}
