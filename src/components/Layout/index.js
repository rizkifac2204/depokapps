import { useEffect } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Box, AppBar, Toolbar, useMediaQuery } from "@mui/material";

import Breadcrumbs from "./ui-components/extended/Breadcrumbs";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Customization from "./Customization";
import { drawerWidth } from "store/constant";
import { useRizkiContext, handleDrawerToggle } from "context";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import navigation from "menu-items";

// styles
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up("md")]: {
        marginLeft: -(drawerWidth - 20),
        width: `calc(100% - ${drawerWidth}px)`,
      },
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
        marginRight: "10px",
      },
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.down("md")]: {
        marginLeft: "20px",
      },
      [theme.breakpoints.down("sm")]: {
        marginLeft: "10px",
      },
    }),
  })
);

function Layout({ children }) {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"), {
    noSsr: true,
  });
  const [init, action] = useRizkiContext();
  const { opened } = init;

  const setHandleDrawerToggle = () => {
    handleDrawerToggle(action, !opened);
  };

  useEffect(() => {
    handleDrawerToggle(action, !matchDownMd);
  }, [matchDownMd]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: opened ? theme.transitions.create("width") : "none",
        }}
      >
        <Toolbar>
          <Header setHandleDrawerToggle={setHandleDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar
        drawerOpen={opened}
        setHandleDrawerToggle={setHandleDrawerToggle}
      />

      <Main theme={theme} open={opened}>
        <Breadcrumbs
          separator={ChevronRightIcon}
          navigation={navigation}
          icon
          title
          rightAlign
        />
        {children}
        {/* {JSON.stringify(theme, null, 2)} */}
      </Main>

      <Customization />
    </Box>
  );
}

export default Layout;
