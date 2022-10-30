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
import {
  Login,
  Landscape,
  Menu,
  PeopleAlt,
  AddBusiness,
  Logout,
} from "@mui/icons-material";

import Drawer from "../Drawer";
import { useAppDispatch, useAppSelector } from "redux/store";
import { logout } from "redux/features/authSlice";

const navigationItems = [
  {
    id: 1,
    name: "All Users",
    address: "/",
    icon: <PeopleAlt />,
  },
  {
    id: 2,
    name: "My Places",
    address: "",
    icon: <Landscape />,
  },
  {
    id: 3,
    name: "Add Place",
    address: "/places/new",
    icon: <AddBusiness />,
  },
  {
    id: 4,
    name: "Authentication",
    address: "/authentication",
    icon: <Login />,
  },
  {
    id: 5,
    name: "Sign Out",
    address: "/",
    icon: <Logout />,
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
          <Typography
            variant="h6"
            onClick={() => navigate("/")}
            component="div"
            sx={{
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            Places
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>

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
          onBtnClick={(name: string, address: string) =>
            onBtnClick(name, address)
          }
        />
      </Box>
      <Toolbar id="back-to-top-anchor" />
    </>
  );
}

export default Navigation;
