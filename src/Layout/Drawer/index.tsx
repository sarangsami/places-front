import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactNode } from "react";
import { ReactChildrenType } from "types";

const drawerWidth = 240;

interface DrawerProps extends ReactChildrenType {
  onOpenHandler: () => void;
  open: boolean;
  onBtnClick: (name: string, address: string) => void;
  items: {
    id: number;
    name: string;
    address: string;
    icon?: ReactNode;
  }[];
}

const CustomDrawer = (props: DrawerProps) => {
  const { window, onOpenHandler, open, items, onBtnClick } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={open}
      anchor="right"
      onClose={onOpenHandler}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <Box onClick={onOpenHandler} sx={{ textAlign: "center" }}>
        <List>
          {items.map(({ id, name, address, icon }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => onBtnClick(name, address)}
              >
                <ListItemText primary={name} />
                <ListItemIcon sx={{ minWidth: "unset" }}>{icon}</ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
