import { createContext } from "react";
import { IApiKeyContext } from "../interfaces/interfaces";

export const ApiKeyContext = createContext<IApiKeyContext>({
  apiKey: "",
  setApiKey: () => {},
});
