import { useDispatch } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../redux/slices/todoSlice";

export default function TodoItem({ todo }) {
    const dispatch = useDispatch()

    return (
        <li id={todo.id} className={todo.completed ? 'completed' : ''}>
            <input 
                type="checkbox"
                className="checkbox"
                checked={todo.completed}
                onChange={() => dispatch(toggleTodo({
                    id: todo.id,
                    completed: !todo.completed
                }))}
            />

            <input type="text"
             className={todo.completed ? 'completed' : ''}
             value={todo.text}
             onChange={(e) => dispatch(updateTodo({
                id: todo.id,
                text: e.target.value
            }))} 
            />

            <button onClick={() => dispatch(removeTodo(todo.id))}>Remove</button>
        </li>
    )
}