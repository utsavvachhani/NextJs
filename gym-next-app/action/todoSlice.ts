import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  createTodoAPI, 
  getTodosAPI, 
  getTodoStatsAPI, 
  updateTodoAPI, 
  deleteTodoAPI, 
  updateStatusAPI 
} from "../api/todoApi";
import { showAlert } from "./alertSlice";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

interface Todo {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  workoutType: "strength" | "cardio" | "yoga" | "mobility" | "other";
  duration?: number;
  caloriesBurned?: number;
  exerciseList: Exercise[];
  priority: "low" | "medium" | "high";
  status: "pending" | "completed" | "skipped";
  isDeleted: boolean;
  scheduledFor?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface TodoState {
  todos: Todo[];
  stats: {
    total: number;
    completed: number;
    pending: number;
    efficiency: number;
  };
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
}

const initialState: TodoState = {
  todos: [],
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
    efficiency: 0
  },
  loading: false,
  error: null,
  page: 1,
  totalPages: 1
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (params: any, { rejectWithValue }) => {
    try {
      const data = await getTodosAPI(params);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch todos");
    }
  }
);

export const fetchTodoStats = createAsyncThunk(
  "todo/fetchTodoStats",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getTodoStatsAPI();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch stats");
    }
  }
);

export const createTodo = createAsyncThunk(
  "todo/createTodo",
  async (todoData: any, { rejectWithValue, dispatch }) => {
    try {
      const data = await createTodoAPI(todoData);
      dispatch(showAlert({ message: "Workout logged successfully!", type: "success" }));
      dispatch(fetchTodoStats());
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to log workout";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const updateTodoStatus = createAsyncThunk(
  "todo/updateStatus",
  async ({ id, status }: { id: string, status: string }, { rejectWithValue, dispatch }) => {
    try {
      const data = await updateStatusAPI(id, status);
      dispatch(showAlert({ message: `Status updated to ${status}`, type: "info" }));
      dispatch(fetchTodoStats());
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update status";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await deleteTodoAPI(id);
      dispatch(showAlert({ message: "Moved to trash", type: "info" }));
      dispatch(fetchTodoStats());
      return id;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete todo";
      dispatch(showAlert({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.todos;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTodoStats.fulfilled, (state, action) => {
        state.stats = {
          total: action.payload.total,
          completed: action.payload.completed,
          pending: action.payload.pending,
          efficiency: action.payload.efficiency
        };
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos = [action.payload.todo, ...state.todos];
      })
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        state.todos = state.todos.map(todo => 
          todo._id === action.payload.todo._id ? action.payload.todo : todo
        );
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      });
  },
});

export const { setPage } = todoSlice.actions;
export default todoSlice.reducer;
