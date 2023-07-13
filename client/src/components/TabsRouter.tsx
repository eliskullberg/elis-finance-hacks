import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {
  MemoryRouter,
  Route,
  Routes,
  Link,
  matchPath,
  useLocation,
} from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import PortFolioSummary from "./PortfolioSummary";
import RightGridContainer from "./RightGridContainer";

function Router(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/holdings">{children}</StaticRouter>;
  }

  return (
    <MemoryRouter initialEntries={["/holdings"]} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  const routeMatch = useRouteMatch(["/rightstracker", "/holdings"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}>
      <Tab label="Holdings" value="/holdings" to="/holdings" component={Link} />
      <Tab
        label="Right Tracker"
        value="/rightstracker"
        to="/rightstracker"
        component={Link}
      />
    </Tabs>
  );
}

export default function TabsRouter() {
  return (
    <Router>
      <Box sx={{ width: "100%" }}>
        <MyTabs />
        <Routes>
          <Route path="/holdings" element={<PortFolioSummary />} />
          <Route path="/*" element={<RightGridContainer />} />
        </Routes>
      </Box>
    </Router>
  );
}
