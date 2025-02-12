import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoApi } from "../../services/todoApi";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async (_, { rejectWithValue }) => {
        try {
            return await todoApi.getAllTodos()
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const createTodoAsync = createAsyncThunk(
    'todos/createTodo',
    async (todoData, { rejectWithValue }) => {
        try {
            return await todoApi.createTodo(todoData)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateTodoAsync = createAsyncThunk(
    'todos/updateTodo',
    async ({ id, updates }, { rejectWithValue }) => {
        try {
            return await todoApi.updateTodo(id, updates)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const deleteTodoAsync = createAsyncThunk(
    'todos/deleteTodo',
    async (id, { rejectWithValue }) => {
        try {
            await todoApi.deleteTodo(id)
            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(createTodoAsync.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(createTodoAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items.push(action.payload)
            })
            .addCase(createTodoAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(updateTodoAsync.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const index = state.items.findIndex(todo => todo.id === action.payload.id)
                if (index !== -1) {
                    state.items = state.items.map(todo =>
                        todo.id === action.payload.id ? action.payload : todo
                    )
                }
            })
            .addCase(updateTodoAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(deleteTodoAsync.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = state.items.filter(todo => todo.id !== action.payload)
            })
            .addCase(deleteTodoAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export default todoSlice.reducer