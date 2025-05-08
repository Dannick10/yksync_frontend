import { Task, responseTask, taskState } from "@/@types/taskTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "../services/TaskService";
import { RootState } from "../store";
import { getStacks } from "./stackSlices";

const initialState: taskState = {
  tasks: [],
  error: null,
  loading: false,
  success: false,
  message: null,
};

export const createTask = createAsyncThunk<
  responseTask,
  { task: Task; id: string },
  { state: RootState }
>("task/create", async ({ task, id }, thunkapi) => {

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

export const updateTaks = createAsyncThunk<
  responseTask,
  { id: string; status: string },
  { state: RootState }
>("task/update", async ({ id, status }, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const data = await taskService.updateTask(id, status, token);

    if (data.errors) {
      return thunkapi.rejectWithValue(data.errors[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Erro ao criar tarefa");
  }
});

export const deleteTask = createAsyncThunk<
  responseTask,
  string,
  { state: RootState }
>("task/delete", async (id, thunkapi) => {
  try {
    const token = thunkapi.getState().auth.token;
    const data = await taskService.deleteTaks(id, token);
    if (data.errors) {
      return thunkapi.rejectWithValue(data.errors[0]);
    }

    return data;
  } catch (err) {
    return thunkapi.rejectWithValue("Erro ao excluir a tarefa");
  }

});

export const getTask = createAsyncThunk<
  responseTask,
  { id: string },
  { state: RootState }
>("task/get", async ({ id }, thunkapi) => {

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
  name: "project",
  initialState,
  reducers: {
    resetMessageTask: (state) => {
      state.message = null;
    },
    resetTask: (state) => {
      state.loading = false;
      state.error = null;
      state.tasks = [];
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
      
        if (action.payload.task) {
          state.tasks = state.tasks ? [...state.tasks, action.payload.task] : [action.payload.task];
        }
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
        state.message = null;
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.tasks = action.payload.tasks || [];
      })
      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.tasks = [];
        state.message = action.payload as string;
      })

      .addCase(updateTaks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(updateTaks.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
     
        if (state.tasks && action.payload.task) {
          state.tasks = state.tasks.map(task => 
            task._id === action.payload.task!._id ? action.payload.task! : task
          );
        }
      })
      .addCase(updateTaks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = action.payload as string;
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;

        if (Array.isArray(state.tasks)) {
          state.tasks = state.tasks.filter(task => task._id !== action.meta.arg);
        }

      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
        state.message = action.payload as string;
      });
  },
});
export const { resetMessageTask, resetTask } = taskSlice.actions;
export default taskSlice.reducer;
