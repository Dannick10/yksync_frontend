import { responseStacks, stackState, stacks } from "@/@types/stackTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stacksService } from "../services/stackService";
import { RootState } from "../store";

const initialState: stackState = {
  stacks: undefined,
  error: null,
  loading: false,
  sucess: false,
  message: null,
};

export const getStacks = createAsyncThunk<
responseStacks,
void,
  { state: RootState }
>("stacks", async (_, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const data = await stacksService.getStacks(token);

    if (data.erros) {
      return thunkapi.rejectWithValue(data.erros[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Error ao buscar stacks do usuario");
  }
});

export const stackSlices = createSlice({
  name: "stack",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    ressetStatus: (state) => {
      state.stacks = undefined;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStacks.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload as string;
        state.stacks = undefined;
      })
      .addCase(getStacks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.stacks = action.payload as any;
      });
  },
});

export const { resetMessage, ressetStatus } = stackSlices.actions;
export default stackSlices.reducer;
