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
  meta: undefined,
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
  number,
  { state: RootState }
>("project/get", async (page, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const id = thunkapi.getState().user.user?._id;

    const data = await projectService.getProject(token, page, id);

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

export const projectEdit = createAsyncThunk<
  responseProjectId,
  project,
  { state: RootState }
>("project/edit", async (project, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const data = await projectService.projectEdit(project, token);

    if (data.errors) {
      return thunkapi.rejectWithValue(data.errors[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Error ao buscar projeto");
  }
});

export const projectDelete = createAsyncThunk<
  responseProjects,
  project,
  { state: RootState }
>("project/delete", async (_id, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const data = await projectService.projectDelete(_id,token);

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
    resetProject: (state) => {
      state.loading = false;
      state.error = null
      state.projects = [];
      state.message = null 
      state.project = undefined
    }
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
        state.meta = action.payload.meta;
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
      })
      .addCase(projectEdit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(projectEdit.fulfilled, (state, action) => {
        state.project = action.payload.project
        state.loading = false;
        state.success = true;
        state.message = action.payload.message.message as string;
      })
      .addCase(projectEdit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.projects = [];
        state.project = undefined;
        state.message = null;
      })
      .addCase(projectDelete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(projectDelete.fulfilled, (state, action) => {
        state.project = undefined
        state.loading = false;
        state.success = true;
        state.message = action.payload.message as string;
      })
      .addCase(projectDelete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.projects = [];
        state.project = undefined;
        state.message = null;
      })
      
  },
});

export const { resetMessage, resetProject } = projectSlice.actions;
export default projectSlice.reducer;
