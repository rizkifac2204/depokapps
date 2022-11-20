import { useRizkiContext } from "context";
import { useTheme } from "@mui/material/styles";

export default function Home() {
  const [init, action] = useRizkiContext();
  const theme = useTheme();
  return (
    <div>
      Home <br /> {JSON.stringify(theme.typography.fontFamily)}
    </div>
  );
}
