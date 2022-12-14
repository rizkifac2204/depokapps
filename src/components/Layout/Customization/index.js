import { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import SubCard from "../ui-components/cards/SubCard";
import AnimateButton from "../ui-components/extended/AnimateButton";
import { gridSpacing } from "store/constant";

import { useRizkiContext, handleFont, handleBorder } from "context";

// concat 'px'
function valueText(value) {
  return `${value}px`;
}

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
  const theme = useTheme();

  const [init, action] = useRizkiContext();
  const { borderRadius: initBorder, fontFamily: initFont } = init;

  // drawer on/off
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  // state - border radius
  const [borderRadius, setBorderRadius] = useState(12);
  useEffect(() => {
    setBorderRadius((prev) => initBorder);
  }, [initBorder]);
  const handleBorderRadius = (event, newValue) => {
    handleBorder(action, newValue);
  };

  // state - font family
  const [fontFamily, setFontFamily] = useState("");
  useEffect(() => {
    let initialFont;
    switch (initFont) {
      case `'Inter', sans-serif`:
        initialFont = "Inter";
        break;
      case `'Poppins', sans-serif`:
        initialFont = "Poppins";
        break;
      case `'Roboto', sans-serif`:
      default:
        initialFont = "Roboto";
        break;
    }
    setFontFamily((prev) => initialFont);
  }, [initFont]);

  const handleFontFamily = (value) => {
    let newFont;
    switch (value) {
      case "Inter":
        newFont = `'Inter', sans-serif`;
        break;
      case "Poppins":
        newFont = `'Poppins', sans-serif`;
        break;
      case "Roboto":
      default:
        newFont = `'Roboto', sans-serif`;
        break;
    }
    handleFont(action, newFont);
  };

  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "4px",
            top: "25%",
            position: "fixed",
            right: 10,
            zIndex: theme.zIndex.speedDial,
          }}
        >
          <AnimateButton type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <SettingsOutlinedIcon />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280,
          },
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>
              {/* font family */}
              <SubCard title="Font Family">
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={(e) => handleFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Roboto"
                      control={<Radio />}
                      label="Roboto"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Poppins"
                      control={<Radio />}
                      label="Poppins"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Inter"
                      control={<Radio />}
                      label="Inter"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              {/* border radius */}
              <SubCard title="Border Radius">
                <Grid item xs={12} container spacing={2} alignItems="center">
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      4px
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      size="small"
                      value={borderRadius}
                      onChange={handleBorderRadius}
                      getAriaValueText={valueText}
                      valueLabelDisplay="on"
                      aria-labelledby="discrete-slider-small-steps"
                      marks
                      step={2}
                      min={4}
                      max={24}
                      color="secondary"
                      sx={{
                        "& .MuiSlider-valueLabel": {
                          color: "secondary.light",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      24px
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Customization;
