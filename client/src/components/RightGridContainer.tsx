import RightCard from "./RightCard";
import axios from "axios";
import { useState, useEffect, useContext } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  ServerSubscriptionRightResponse,
  SubscriptionRight,
} from "../interfaces/interfaces";
import { ApiKeyContext } from "./ApiKeyContext";

function RightGridContainer() {
  const [state, setState] = useState("new");
  const [rightCards, setRightCards] = useState<SubscriptionRight[] | []>([]);
  const { apiKey, setApiKey } = useContext(ApiKeyContext);

  const subscriptionRightUrl =
    "https://boreal-antonym-390612.ew.r.appspot.com/api/subscriptionrights/";

  async function getLiveRightData() {
    try {
      const config = {
        headers: {
          "x-api-key": apiKey,
        },
      };
      const rightData: ServerSubscriptionRightResponse = (
        await axios.get(subscriptionRightUrl, config)
      ).data;
      return rightData.rights;
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  useEffect(() => {
    if (state === "new") {
      setState("loading");
      getLiveRightData().then((res) => {
        if (res) {
          setRightCards(res);
          setState("ready");
        } else {
          setState("error");
        }
      });
    }
  }, [state]);

  if (state === "ready") {
    const cards = rightCards;
    return (
      <Grid container>
        {cards.map((right, i) => (
          <Grid xs={12} md={6} lg={3} key={i}>
            <RightCard right={right}></RightCard>
          </Grid>
        ))}
      </Grid>
    );
  } else if (state === "loading") {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return <>API error</>;
  }
}

export default RightGridContainer;
