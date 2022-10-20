import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import placesAxios from "utils/placesAxios";
import { setSnackbar } from "./layoutSlice";
import { AuthFormData, IUser } from "types";

let user;
const localStorageData = localStorage.getItem("user");
if (localStorageData) {
  user = JSON.parse(localStorageData).user;
} else {
  user = null;
}

export const register = createAsyncThunk(
  "auth/register",
  async (data: AuthFormData, thunkAPI) => {
    const { firstName, lastName, email, password } = data;
    const modifiedData = {
      name: firstName,
      family: lastName,
      email,
      password,
    };
    try {
      const response = await placesAxios.register(modifiedData);
      thunkAPI.dispatch(
        setSnackbar({
          open: true,
          color: "success",
          message: `Welcome, You have registered Successfully.`,
        })
      );
      return response.data;
    } catch (error) {
      const errObject = (
        error as {
          response: { [key: string]: { [key: string]: string } };
        }
      ).response.data.message;
      let message = `${errObject}`;
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
      const errObject = (
        error as {
          response: { [key: string]: { [key: string]: string } };
        }
      ).response.data.message;
      let message = `${errObject}`;
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

const initialState: StateType = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

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
