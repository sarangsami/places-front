import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SnackbarType {
  open: boolean;
  message: string;
  color: "success"|"info"|"warning"|"error";
}

export interface LayoutState {
  loading: boolean;
  snackbar: SnackbarType;
}

const initialState: LayoutState = {
  loading: false,
  snackbar: {
    open: false,
    message: "",
    color: "success",
  },
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSnackbar: (state, action: PayloadAction<SnackbarType>) => {
      state.snackbar = action.payload;
    },
  },
});

export const { setLoading,setSnackbar } = layoutSlice.actions;

export default layoutSlice.reducer;
