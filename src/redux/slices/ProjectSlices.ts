import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "../services/projectService";
import { RootState } from "@/redux/store";

interface ProjectState {
  projects: any[];
  error: string | null;
  loading: boolean;
  success: boolean;
  message: string | null;
}

const initialState: ProjectState = {
  projects: [],
  error: null,
  loading: false,
  success: false,
  message: null,
};

export const createProject = createAsyncThunk<any, void, {state: RootState}>(
  "project/create",
  async (project: any, thunkapi) => {
    try {
      const token = thunkapi.getState().auth.token;
      const data = await projectService.createProject(project, token);

      if (data.errors) {
        return thunkapi.rejectWithValue(data.errors[0]);
      }

      return data;
    } catch (err) {
      return thunkapi.rejectWithValue("Erro ao criar projeto");
    }
  }
);

export const getProject = createAsyncThunk<any, void, {state: RootState}>(
  "project/get",
  async (_, thunkapi) => {
    try {
      const token = thunkapi.getState().auth.token;

      const data = await projectService.getProject(token);

      if (data.errors) {
        return thunkapi.rejectWithValue(data.errors[0]);
      }

      return data;
    } catch (err) {
      return thunkapi.rejectWithValue("Erro ao buscar projetos");
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.projects = [];
        state.message = action.payload as string;
      })
      .addCase(getProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.projects = action.payload.project;
      });
  },
});

export const { resetMessage } = projectSlice.actions;
export default projectSlice.reducer;
