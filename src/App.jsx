import { useState } from 'react'
import './App.css'
import TodoList from './components/todoList.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { createTodoAsync } from './redux/slices/todoSlice'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()
  const status = useSelector(state => state.todos.status)

  const handleNewTodo = async (e) => {
    e.preventDefault()

    if (newTodo.trim() && status !== 'loading') {
      try {
        await dispatch(createTodoAsync({
          id: Date.now(),
          title: newTodo,
          completed: false
        })).unwrap()
        setNewTodo('')
      } catch (error) {
        console.error('Failed to create todo:', error)
      }
    }
  }

  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        <form onSubmit={handleNewTodo} className="todo-container">
          <input 
            type="text"
            className="todo-input"
            placeholder="Add a new todo"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            disabled={status === 'loading'}
          />

          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Adding...' : 'Add'}
          </button>
        </form>
        
        <TodoList />
      </div>
    </>
  )
}

export default App
