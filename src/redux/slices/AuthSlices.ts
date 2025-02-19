import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authServices } from "../services/AuthService";
import { RootState } from "../store";
import {
  PayloadLogin,
  PayloadSignin,
  authState,
  responseAuthUser,
} from "@/@types/authTypes";

const token = Cookies.get("token");

const initialState: authState = {
  token: token ?? null,
  error: undefined,
  loading: false,
  sucess: false,
};

export const signUser = createAsyncThunk<
  responseAuthUser,
  PayloadSignin,
  { state: RootState; rejectValue: string }
>("auth/signUser", async (user, Thunkapi) => {
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
});

export const LogoutUser = createAsyncThunk(
  "auth/logout",
  async () => await authServices.logout()
);

export const loginUser = createAsyncThunk<
  responseAuthUser,
  PayloadLogin,
  { state: RootState; rejectValue: string }
>("auth/login", async (user, Thunkapi) => {
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
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = undefined;
      state.sucess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(signUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.sucess = true;
        state.token = action.payload.token;
      })
      .addCase(signUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
      })
      .addCase(LogoutUser.fulfilled, (state) => {
        state.loading = false;
        state.error = undefined;
        state.sucess = false;
        state.token = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = undefined;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.sucess = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
