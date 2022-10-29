import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import placesAxios from "utils/placesAxios";
import { setSnackbar } from "./layoutSlice";
import { AuthFormData, CustomErrorType, IUser } from "types";

let user: IUser | null;
let userExp: undefined | string;
const localStorageData = localStorage.getItem("user");
if (localStorageData) {
  user = JSON.parse(localStorageData).user;
  userExp = JSON.parse(localStorageData).exp;
} else {
  user = null;
}
console.log(userExp);

export const register = createAsyncThunk(
  "auth/register",
  async (data: AuthFormData, thunkAPI) => {
    const { firstName, lastName, email, password, image } = data;
    const formData = new FormData();
    formData.append("name", firstName || "");
    formData.append("family", lastName || "");
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image || "");

    try {
      const response = await placesAxios.register(formData);
      thunkAPI.dispatch(
        setSnackbar({
          open: true,
          color: "success",
          message: `Welcome, You have registered Successfully.`,
        })
      );
      return response.data;
    } catch (error) {
      const message = `${(error as CustomErrorType)?.response?.data.message}`;
      thunkAPI.dispatch(
        setSnackbar({
          open: true,
          color: "error",
          message,
        })
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formData: AuthFormData, thunkAPI) => {
    try {
      const data = await placesAxios.login(formData);
      const fetchedUser: IUser = data.user;
      return { user: fetchedUser };
    } catch (error) {
      const message = `${(error as CustomErrorType)?.response?.data.message}`;
      thunkAPI.dispatch(
        setSnackbar({
          open: true,
          color: "error",
          message,
        })
      );
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", () => {
  placesAxios.logOut();
});

export interface StateType {
  isLoggedIn: boolean;
  user: IUser | null;
}

const stateGenerator = () => {
  if (user && userExp) {
    if (userExp > new Date().toISOString()) {
      return { isLoggedIn: true, user };
    } else {
      placesAxios.logOut();
      return { isLoggedIn: false, user: null };
    }
  } else {
    return { isLoggedIn: false, user: null };
  }
};

const initialState: StateType = stateGenerator();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state: StateType) => {
      state.isLoggedIn = false;
    });
    builder.addCase(register.rejected, (state: StateType) => {
      state.isLoggedIn = false;
    });
    builder.addCase(login.fulfilled, (state: StateType, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state: StateType) => {
      state.isLoggedIn = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state: StateType) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

const { reducer } = authSlice;
export default reducer;
