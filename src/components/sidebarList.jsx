import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge } from "@mui/material";
import { SettingsInputSvideo } from "@material-ui/icons";
import useSid from "./useSid";

export const mainListItems = (
  <React.Fragment>
    {/* SideBar Dashboard */}
    <ListItemButton href="/" variant="contained">
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
    <ListItemButton href="/shoppingcart" variant="contained">
      <ListItemIcon>
        <Badge badgeContent={sessionStorage.getItem("checkoutCount")}>
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
    <ListItemButton href="/search" variant="contained">
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
    <ListItemButton href="/settings" variant="contained">
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
      onClick={() => localStorage.clear()}
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
