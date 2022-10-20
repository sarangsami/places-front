import * as React from "react";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { ReactChildrenType } from "types";
import {
  Fab,
  Container,
  Box,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Navigation from "./Navigation";
import ScrollTop from "./ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setSnackbar } from "redux/features/layoutSlice";

export default function BackToTop(props: ReactChildrenType) {
  const { children } = props;
  const layout = useSelector((state: RootState) => state.layoutState);
  const dispatch = useDispatch();
  const { loading, snackbar } = layout;
  const { color, open, message } = snackbar;

  const handleClose = () => {
    dispatch(
      setSnackbar({
        ...snackbar,
        open: false,
      })
    );
  };

  return (
    <React.Fragment>
      <Navigation />
      <Container>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box sx={{ my: 2 }}>{children}</Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={color} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
