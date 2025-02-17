import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authServices } from "../services/AuthService";
import { create } from "domain";

const user = Cookies.get("token");

const initialState = {
  user: user ?? null,
  error: null,
  loading: false,
  sucess: false,
};

export const signUser: any = createAsyncThunk(
  "auth/signUser",
  async (user, Thunkapi) => {
    try {
      const data = await authServices.register(user);

      if (data.erros) {
        return Thunkapi.rejectWithValue(data.erros[0]);
      }

      if (data.token) {
        Cookies.set("token", data.token, { expires: 7, secure: true });
      }

      return data;
    } catch (err) {
      return Thunkapi.rejectWithValue("error ao fazer registro");
    }
  }
);

export const LogoutUser = createAsyncThunk(
  "auth/logout",
  async () => await authServices.logout()
);

export const loginUser: any = createAsyncThunk(
  "auth/login",
  async (user, Thunkapi) => {
    try {
      const data = await authServices.login(user);

      if (data.erros) {
        return Thunkapi.rejectWithValue(data.erros[0]);
      }

      if (data.token) {
        Cookies.set("token", data.token, { expires: 7, secure: true });
      }

      return data;
    } catch (err) {
      return Thunkapi.rejectWithValue("error ao fazer registro");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.sucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.sucess = true;
        state.user = action.payload;
      })
      .addCase(signUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.sucess = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
