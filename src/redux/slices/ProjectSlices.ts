import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectService from "../services/projectService";
import { RootState } from "@/redux/store";

const initialState: ProjectState = {
  project: undefined,
  projects: [],
  error: null,
  loading: false,
  success: false,
  message: null,
};

export const createProject = createAsyncThunk<
  responseProjects,
  project,
  { state: RootState }
>("project/create", async (project: any, thunkapi) => {
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
});

export const getProject = createAsyncThunk<
  responseProjects,
  project,
  { state: RootState }
>("project/get", async (_, thunkapi) => {
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
});

export const getProject_Id = createAsyncThunk<
  responseProjectId,
  string,
  { state: RootState }
>("project/Id", async (_id, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const data = await projectService.getProject_ID(_id, token);

    if (data.errors) {
      return thunkapi.rejectWithValue(data.errors[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Error ao buscar projeto");
  }
});

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
      })
      .addCase(getProject_Id.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProject_Id.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.project = action.payload.project;
      })
      .addCase(getProject_Id.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.project = undefined;
      });
  },
});

export const { resetMessage } = projectSlice.actions;
export default projectSlice.reducer;
