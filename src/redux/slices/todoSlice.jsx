import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) || []
}

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)

            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)

            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        toggleTodo: (state, action) => {
            const { id } = action.payload
            const todo = state.todos.find(todo => todo.id === id)
            if (todo) {
                todo.completed = !todo.completed
            }

            localStorage.setItem('todos', JSON.stringify(state.todos))
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload
            const todo = state.todos.find(todo => todo.id === id)
            if (todo) {
                todo.text = text
            }

            localStorage.setItem('todos', JSON.stringify(state.todos))
        }
    }
})

export const { addTodo, removeTodo, toggleTodo, updateTodo } = todoSlice.actions
export default todoSlice.reducer