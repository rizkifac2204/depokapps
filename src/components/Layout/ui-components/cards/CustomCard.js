import { forwardRef } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Card } from "@mui/material";

// ==============================|| CUSTOM MAIN CARD ||============================== //

const CustomCard = forwardRef(
  ({ border = true, boxShadow, children, shadow, sx = {}, ...others }, ref) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          minWidth: 275,
          border: border ? "1px solid" : "none",
          borderColor: theme.palette.primary[200] + 75,
          ":hover": {
            boxShadow: boxShadow
              ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)"
              : "inherit",
          },
          ...sx,
        }}
      >
        {children}
      </Card>
    );
  }
);

export default CustomCard;
