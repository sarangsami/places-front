import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactChildrenType } from "types";

const drawerWidth = 240;

interface DrawerProps extends ReactChildrenType {
  onOpenHandler: () => void;
  open: boolean;
  items: {
    id: number;
    name: string;
    address: string;
  }[];
}

const CustomDrawer = (props: DrawerProps) => {
  const { window, onOpenHandler, open, items } = props;
  const navigate = useNavigate();

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={open}
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
        <Typography
          variant="h6"
          onClick={() => navigate("/")}
          sx={{ my: 2, cursor: "pointer" }}
        >
          Places
        </Typography>
        <Divider />
        <List>
          {items.map(({ id, name, address }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => navigate(address)}
              >
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default CustomDrawer;
