import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import RemoveIcon from "@mui/icons-material/Remove";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import { Badge } from "@mui/material";

export const mainListItems = (
  <React.Fragment>
    {/* SideBar Dashboard */}
    <ListItemButton href="/" variant="contained">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    {/* SideBar Shopping Cart */}
    <ListItemButton href="/shoppingcart" variant="contained">
      <ListItemIcon>
        <Badge badgeContent={sessionStorage.getItem("checkoutCount")}>
          <ShoppingCartIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary="Shopping Cart" />
    </ListItemButton>
    {/* SideBar Search */}
    <ListItemButton href="/search" variant="contained">
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Search" />
    </ListItemButton>
    {/* SideBar Settings */}
    <ListItemButton href="/settings" variant="contained">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Account Settings" />
    </ListItemButton>
    {/* Logout */}
    <ListItemButton
      href="/"
      variant="contained"
      onClick={() => sessionStorage.clear()}
    >
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </React.Fragment>
);

// export const secondaryListItems = (
//   <React.Fragment>
//     <ListSubheader component="div" inset>
//       Administrator
//     </ListSubheader>
//     {/* SideBar Add */}
//     <ListItemButton href="/add" variant="contained">
//       <ListItemIcon>
//         <AddIcon />
//       </ListItemIcon>
//       <ListItemText primary="Add" />
//     </ListItemButton>
//     {/* SideBar Remove */}
//     <ListItemButton href="/remove" variant="contained">
//       <ListItemIcon>
//         <RemoveIcon />
//       </ListItemIcon>
//       <ListItemText primary="Remove" />
//     </ListItemButton>
//     {/* SideBar Inventory */}
//     <ListItemButton href="/inventory" variant="contained">
//       <ListItemIcon>
//         <InventoryIcon />
//       </ListItemIcon>
//       <ListItemText primary="Inventory" />
//     </ListItemButton>
//     {/* SideBar Inventory */}
//     <ListItemButton href="/surplus" variant="contained">
//       <ListItemIcon>
//         <RunningWithErrorsIcon />
//       </ListItemIcon>
//       <ListItemText primary="Surplus" />
//     </ListItemButton>
//   </React.Fragment>
// );
