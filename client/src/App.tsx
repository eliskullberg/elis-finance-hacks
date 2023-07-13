import "./App.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import TabsRouter from "./components/TabsRouter";
import * as React from "react";
import ApiKeyForm from "./components/ApiKeyForm";
import Header from "./components/Header";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import { ApiKeyContext } from "./components/ApiKeyContext";

function App() {
  const [apiKey, setApiKey] = useState("");
  const savedApiKey = localStorage.getItem("apikey");

  React.useMemo(() => {
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, [savedApiKey]);

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
        {apiKey === "" ? <ApiKeyForm /> : <TabsRouter />}
      </ApiKeyContext.Provider>
    </ThemeProvider>
  );
}

export default App;
