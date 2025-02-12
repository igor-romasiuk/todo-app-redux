import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updateTodoAsync, deleteTodoAsync } from '../redux/slices/todoSlice'
import debounce from 'lodash/debounce'

function TodoItem({ todo }) {
    const dispatch = useDispatch()
    const [text, setText] = useState(todo.title)
    const [isEditing, setIsEditing] = useState(false)

    const debouncedUpdate = useCallback(
        debounce((id, newText) => {
            dispatch(updateTodoAsync({
                id,
                updates: { title: newText }
            }))
        }, 800),
        [dispatch]
    )

    useEffect(() => {
        setText(todo.title)
    }, [todo.title])

    const handleTextChange = (e) => {
        const newText = e.target.value
        setText(newText)
        if (newText.trim() !== todo.title) {
            debouncedUpdate(todo.id, newText)
        }
    }

    const handleToggle = () => {
        dispatch(updateTodoAsync({
            id: todo.id,
            updates: { completed: !todo.completed }
        }))
    }

    const handleDelete = () => {
        dispatch(deleteTodoAsync(todo.id))
    }

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                id={`todo-${todo.id}`}
                name={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={handleToggle}
                className="checkbox"
            />
            <input
                type="text"
                id={`todo-text-${todo.id}`}
                name={`todo-text-${todo.id}`}
                value={text}
                onChange={handleTextChange}
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
                className={`todo-text ${isEditing ? 'editing' : ''} ${todo.completed ? 'completed' : ''}`}
            />
            <button 
                onClick={handleDelete}
                className="delete-btn"
            >
                Видалити
            </button>
        </div>
    )
}

export default TodoItem