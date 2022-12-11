import * as React from "react";
// ----------------------------------------------------------------
// Material UI components
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// ----------------------------------------------------------------
// Sidebar Navigator Icons
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// ----------------------------------------------------------------
// Imports for the page
import { MainListItems } from "../../components/sidebarList";
import SearchMain from "./HelloSearch";
//Imports for user data
import axios from "axios";
import { useCookies } from "react-cookie";
import UserContext from "../../components/UserContext";
import { useContext, useEffect } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme({
  palette: {
    primary: {
      main: "#0064B1",
    },
    secondary: {
      main: "#F58025",
    },
    background: {
      default: "#000",
      paper: "#808080",
    },
    type: "dark",
    text: {
      primary: "#000000",
      secondary: "#000000",
    },
  },
});

function SearchContent() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  // Boiler Plate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  const [cookies, setCookies, removeCookies] = useCookies([
    "inventory_session_id",
  ]);
  // reset the UserContext
  const { user_id, set_user_id } = useContext(UserContext);
  const { user_email, set_user_email } = useContext(UserContext);
  const { user_name, set_user_name } = useContext(UserContext);
  const { user_type_id, set_user_type_id } = useContext(UserContext);
  const { cart_count, set_cart_count } = useContext(UserContext);
  // get user data
  const getUserData = async () => {
    const request_url = "/users/session/getSession";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        api_key: API_KEY,
      },
      data: {
        session_id: cookies.inventory_session_id,
      },
      url: request_url,
    };

    //axios request
    const response = await axios(options)
      .then((response) => {
        if (response.status === 200) {
          console.log(JSON.parse(response.data.session));
          let cookie = JSON.parse(response.data.session);
          set_user_id(cookie.user_data_items.user_id);
          set_user_email(cookie.user_data_items.user_email);
          set_user_name(cookie.user_data_items.user_name);
          set_user_type_id(cookie.user_data_items.user_type_id);
          set_cart_count(
            cookie.user_data_items.user_session_data.checkout_count
          );
        }
      })
      .catch((error) => {
        console.log(error);
        alert("cookie Expired");
      });
  };

  useEffect(() => {
    if (user_id == "") {
      getUserData();
    }
  }, []);
  // Boiler Plate ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Card sx={{ bgcolor: "primary.main", borderColor: "primary.main" }}>
              <CardMedia
                component="img"
                height="80"
                image={
                  "https://cdn.glitch.global/8f82fd3a-14bb-4138-b568-087de2f01eea/logo_small.png?v=1667866685214"
                }
                alt="logo"
              />
            </Card>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            ></Typography>
          </Toolbar>
        </AppBar>
        {/* Side Nav Bar */}
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <MainListItems />
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        {/* where the Main Homepage stuff happens*/}
        <Box
          component="main"
          sx={{
            backgroundColor: "#e1e8f0",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Welcome Card */}
              <Grid item xs={25} md={25} lg={25}>
                <Paper
                // sx={{
                //   p: 2,
                //   display: "flex",
                //   flexDirection: "column",
                //   height: 800,
                //   backgroundColor: "#FFFFFF"
                // }}
                >
                  <SearchMain />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Search() {
  return <SearchContent />;
}
