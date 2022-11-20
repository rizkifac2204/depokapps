// material-ui
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import themes from "themes";
import { useRizkiContext } from "context";

function ThemePrepare({ children }) {
  const [init, action] = useRizkiContext();

  return (
    <ThemeProvider theme={themes(init)}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemePrepare;
