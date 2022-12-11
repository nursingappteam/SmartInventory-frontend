import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { Badge } from "@mui/material";
import { SettingsInputSvideo } from "@material-ui/icons";
//import useSid from "./useSid";
import { useCookies } from "react-cookie";
import { useContext } from "react";
import UserContext from "./UserContext";

export const MainListItems = () => {
  const { cart_count, set_cart_count } = useContext(UserContext);
  return (
    <React.Fragment>
      {/* SideBar Dashboard */}
      <ListItemButton component={RouterLink} to="/" variant="contained">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText
          primary="Dashboard"
          sx={{ color: "primary.contrastText", textTransform: "uppercase" }}
          primaryTypographyProps={{
            fontSize: "17px",
            fontWeight: "1000",
            fontFamily: "Monospace",
          }}
        />
      </ListItemButton>
      {/* SideBar Shopping Cart */}
      <ListItemButton
        component={RouterLink}
        to="/shoppingcart"
        variant="contained"
      >
        <ListItemIcon>
          <Badge badgeContent={cart_count}>
            <ShoppingCartIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary="Shopping Cart"
          sx={{ color: "primary.contrastText", textTransform: "uppercase" }}
          primaryTypographyProps={{
            fontSize: "17px",
            fontWeight: "1000",
            fontFamily: "Monospace",
          }}
        />
      </ListItemButton>
      {/* SideBar Search */}
      <ListItemButton component={RouterLink} to="/search" variant="contained">
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText
          primary="Search"
          sx={{ color: "primary.contrastText", textTransform: "uppercase" }}
          primaryTypographyProps={{
            fontSize: "17px",
            fontWeight: "1000",
            fontFamily: "Monospace",
          }}
        />
      </ListItemButton>
      {/* SideBar Settings */}
      <ListItemButton component={RouterLink} to="/settings" variant="contained">
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText
          primary="Account Settings"
          sx={{ color: "primary.contrastText", textTransform: "uppercase" }}
          primaryTypographyProps={{
            fontSize: "17px",
            fontWeight: "1000",
            fontFamily: "Monospace",
          }}
        />
      </ListItemButton>
      {/* Logout */}
      <ListItemButton
        href="/"
        variant="contained"
        onClick={() => {
          document.cookie =
            "inventory_session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          sx={{ color: "primary.contrastText", textTransform: "uppercase" }}
          primaryTypographyProps={{
            fontSize: "17px",
            fontWeight: "1000",
            fontFamily: "Monospace",
          }}
        />
      </ListItemButton>
    </React.Fragment>
  );
};
