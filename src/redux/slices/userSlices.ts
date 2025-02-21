import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { AppDispatch, RootState } from "../store";
import { user, userStates } from "@/@types/userTypes";

const initialState: userStates = {
  user: null,
  error: null,
  sucess: false,
  loading: false,
  message: null,
};

export const Getprofile = createAsyncThunk<any, user | void, { state: RootState }>(
  "user/profile",
  async (_, Thunkapi) => {
    try {
      const token = Thunkapi.getState().auth.token;

      const data = await userService.profile(token);

      if (data.erros) {
        return Thunkapi.rejectWithValue(data.erros[0]);
      }

      return data;
    } catch (err) {
      return Thunkapi.rejectWithValue("Erro ao resgatar usuário");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    resetUser: (state) => {
      state.loading = false;
      state.sucess = true;
      state.error = null;
      state.user = null
    }
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
      });
  },
});

export const { resetMessage, resetUser } = userSlice.actions;
export default userSlice.reducer;
