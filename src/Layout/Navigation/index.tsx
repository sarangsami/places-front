import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { MenuBook } from "@mui/icons-material";

import Drawer from "../Drawer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { logout } from "redux/features/authSlice";

const navigationItems = [
  {
    id: 1,
    name: "All Users",
    address: "/",
  },
  {
    id: 2,
    name: "My Places",
    address: "",
  },
  {
    id: 3,
    name: "Add Place",
    address: "/places/new",
  },
  {
    id: 4,
    name: "Authentication",
    address: "/authentication",
  },
  {
    id: 5,
    name: "Sign Out",
    address: "/",
  },
];

function Navigation() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAppSelector((state) => state.authState.user);
  const dispatch = useAppDispatch();

  const renderMenu = () => {
    const unAuthMenu = navigationItems.filter(
      (item) =>
        item.name !== "My Places" &&
        item.name !== "Add Place" &&
        item.name !== "Sign Out"
    );
    const authMenu = navigationItems.filter(
      (item) => item.name !== "Authentication"
    );
    if (user) {
      return authMenu;
    } else {
      return unAuthMenu;
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const onLogoutHandler = async () => {
    dispatch(logout());
  };

  const onBtnClick = (name: string, address: string) => {
    if (name === "Sign Out") {
      onLogoutHandler();
    } else {
      navigate(name === "My Places" ? `/${user?._id}/places` : address);
    }
  };

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuBook />
          </IconButton>
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", cursor: "pointer" },
            }}
          >
            Places
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {renderMenu().map(({ id, name, address }) => {
              return (
                <Button
                  key={id}
                  sx={{ color: "#fff" }}
                  onClick={() => onBtnClick(name, address)}
                >
                  {name}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          onOpenHandler={handleDrawerToggle}
          open={mobileOpen}
          items={renderMenu()}
        />
      </Box>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}

export default Navigation;
