import { useSelector } from 'react-redux'
import TodoItem from './todoItem'

export default function TodoList() {
    const todos = useSelector(state => state.todos.todos)

    return (
        <div className="todos">
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    )
}