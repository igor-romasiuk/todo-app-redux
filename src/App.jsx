import { useState } from 'react'
import './App.css'
import TodoList from './components/todoList.jsx'
import { useDispatch } from 'react-redux'
import { addTodo } from './redux/slices/todoSlice'

function App() {
  const [newTodo, setNewTodo] = useState('')
  const dispatch = useDispatch()

  const handleNewTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo({
        id: Date.now(),
        text: newTodo,
        completed: false
      }))

      setNewTodo('')
    }
  }

  return (
    <>
      <div className="container">
        <h1>Todo App</h1>
        <div className="todo-container">
          <input type="text"
            placeholder="Add a new todo"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />

          <button onClick={handleNewTodo}>Add</button>
        </div>
        
        <TodoList />
      </div>
    </>
  )
}

export default App
