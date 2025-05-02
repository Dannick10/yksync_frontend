import { statusState, responseStatus } from "@/@types/statusTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { statusService } from "../services/statusService";

const initialState: statusState = {
  status: undefined,
  projectsCurrent: undefined,
  projectsFinish: undefined,
  projectTotal: undefined,
  error: null,
  loading: false,
  sucess: false,
  message: null,
};

export const getStatus = createAsyncThunk<
  responseStatus,
  void,
  { state: RootState }
>("status", async (_, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const data = await statusService.getStatus(token);

    if (data.errors) {
      return thunkapi.rejectWithValue(data.errors[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Error ao buscar status do usuario");
  }
});

export const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    ressetStatus: (state) => {
      state.status = undefined;
      state.projectTotal = undefined;
      state.projectsCurrent = undefined;
      state.projectsFinish = undefined;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload as string;
      })
      .addCase(getStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.status = action.payload.status;
        state.projectTotal = action.payload.projectsTotal;
        state.projectsCurrent = action.payload.projectsCurrent;
        state.projectsFinish = action.payload.projectsFinish;
        state.projectsOverdue = action.payload.projectsOverdue
      });
  },
});

export const { resetMessage, ressetStatus } = statusSlice.actions;
export default statusSlice.reducer;
