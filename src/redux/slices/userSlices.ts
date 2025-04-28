import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { RootState } from "../store";
import { user, userStates } from "@/@types/userTypes";
import Cookies from "js-cookie";

const initialState: userStates = {
  user: null,
  error: null,
  sucess: false,
  loading: false,
  message: null,
};

export const Getprofile = createAsyncThunk<
  any,
  user | void,
  { state: RootState }
>("user/profile", async (_, Thunkapi) => {
  try {
    const token: string | null = Thunkapi.getState().auth.token;

    const data = await userService.profile(token);

    if (data.erros) {
      Cookies.remove("token");
      return Thunkapi.rejectWithValue(data.erros[0]);
    }

    return data;
  } catch (err) {
    Cookies.remove("token");
    return Thunkapi.rejectWithValue("Erro ao resgatar usuário");
  }
});

export const udpateProfile = createAsyncThunk<
  any,
  user | void,
  { state: RootState }
>("user/update", async (body, Thunkapi) => {
  try {
    const token: string | null = Thunkapi.getState().auth.token;
    console.log(token)

    const data = await userService.editProfile(token, body);

    if (data.erros) {
      Cookies.remove("token");
      return Thunkapi.rejectWithValue(data.erros[0]);
    }

    return data;
  } catch (err) {
    Cookies.remove("token");
    return Thunkapi.rejectWithValue("Erro ao resgatar usuário");
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(Getprofile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Getprofile.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(udpateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(udpateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = null;
        state.message = action.payload.message
        state.user = action.payload.user;
      })
      .addCase(udpateProfile.rejected, (state, action) => {
        state.loading = false;
        state.sucess = true;
        state.error = action.payload as string;
        state.user = null
      });
  },
});

export const { resetMessage, resetUser } = userSlice.actions;
export default userSlice.reducer;
