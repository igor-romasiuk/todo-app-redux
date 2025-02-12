import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTodos } from '../redux/slices/todoSlice'
import TodoItem from './TodoItem'

function TodoList() {
    const dispatch = useDispatch()
    const { items = [], status, error } = useSelector(state => state.todos || {})

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTodos())
        }
    }, [status, dispatch])

    if (status === 'loading') {
        return (
            <div className="loading">
                <p>Завантаження...</p>
            </div>
        )
    }

    if (status === 'failed') {
        return (
            <div className="error">
                <p>Помилка: {error}</p>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="empty-list">
                <p>Немає завдань</p>
            </div>
        )
    }

    return (
        <div className="todo-list">
            {items.map(todo => (
                <TodoItem 
                    key={todo.id} 
                    todo={todo}
                />
            ))}
        </div>
    )
}

export default TodoList