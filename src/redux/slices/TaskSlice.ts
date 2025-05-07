import { Task, responseTask, taskState } from "@/@types/taskTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "../services/TaskService";
import { RootState } from "../store";
import { responseStacks, stacks } from "@/@types/stackTypes";

const initialState: taskState = {
  tasks: undefined,
  error: null,
  loading: false,
  success: false,
  message: null,
};

export const createTask = createAsyncThunk<
  responseTask,
  { task: Task; id: string },
  { state: RootState }
>("project/create", async ({ task, id }, thunkapi) => {
  console.log(task);

  try {
    const token = thunkapi.getState().auth.token;
    const data = await taskService.createTask(task, id, token);

    if (data.errors) {
      return thunkapi.rejectWithValue(data.errors[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Erro ao criar tarefa");
  }
});

export const getTask = createAsyncThunk<
  responseTask,
  { id: string },
  { state: RootState }
>("project/get", async ({ id }, thunkapi) => {
  console.log(id);

  try {
    const token = thunkapi.getState().auth.token;
    const data = await taskService.getTask(id, token);

    if (data.errors) {
      return thunkapi.rejectWithValue(data.errors[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Erro ao criar tarefa");
  }
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    resetMessageTask: (state) => {
      state.message = null;
    },
    resetTask: (state) => {
      state.loading = false;
      state.error = null;
      state.tasks = undefined;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createTask.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = "";
    })
    .addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
    })
    .addCase(createTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
      state.message = action.payload as string;
    })
    
    .addCase(getTask.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.message = "";
    })
    .addCase(getTask.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.tasks = action.payload.tasks;
    })
    .addCase(getTask.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
      state.tasks = undefined;
      state.message = action.payload as string;
    })
  },
});

export const { resetMessageTask, resetTask } = taskSlice.actions;
export default taskSlice.reducer;
