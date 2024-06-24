import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import IconPack from "./IconPack";
import Navbar from "./Navbar";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SidebarComponet = ({ Componets }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { collapsed } = useContext(GlobalContext);

  const [sideBarItem, setSidebarItem] = useState([
    {
      name: "Dashboard",
      link: "/",
      icon: "dashboard",
      active: ["/"],
    },
    // {
    //   name: "Add Product",
    //   link: "/addproduct",
    //   icon: "filladd",
    //   active: ["/addproduct" , "/addproduct/createvariant"],
    // },
    {
      name: "Product",
      link: "/viewproduct",
      icon: "view",
      active: ["/viewproduct" , "/addproduct" , "/addproduct/createvariant"],
    },
    {
      name: "Theme",
      link: "/theme",
      icon: "theme",
      active: ["/theme"],
    },
  ]);
   
  // console.log(location.pathname)

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box sx={{ display: "flex",}}>
        <CssBaseline />
        <AppBar position="fixed" open={open} className="shadow-sm">
          <Toolbar className="w-100 bg-white border">
            <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {sideBarItem.map(({ name, active, icon, link }, index) => (
              <ListItem
              onClick={() => {
                navigate(link);
              }}
                key={index}
                className={`${
                  active.includes(location.pathname) && "bg-primary-subtle"
                }`}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <IconPack icon={icon} />
                  </ListItemIcon>
                  <ListItemText primary={name} sx={{ opacity: open ? 1 : 0  }}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          className="bg-gray-100"
          sx={{ flexGrow: 1 , minHeight:"100vh" }}
        >
          <div className="w-100">
            <div className="app-content-area">
              <div className="container-fluid">{Componets}</div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default SidebarComponet;
