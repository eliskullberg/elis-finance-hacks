import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { ApiKeyContext } from "./ApiKeyContext";

// TODO: Fix types
export default function ApiKeyForm() {
  const [formApiKey, setFormApiKey] = useState("");
  const { apiKey, setApiKey } = useContext(ApiKeyContext);

  const handleSubmit = () => {
    localStorage.setItem("apikey", formApiKey);
    setApiKey(formApiKey);
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <h2>Login Form</h2>
      <TextField
        label="API Key"
        onChange={(e) => setFormApiKey(e.target.value)}
        required
        variant="outlined"
        color="secondary"
        type="password"
        value={formApiKey}
        fullWidth
        sx={{ mb: 3 }}
      />
      <Button variant="outlined" color="secondary" type="submit">
        Show me the hacks!
      </Button>
    </form>
  );
}
