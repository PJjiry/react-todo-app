import { useTodosContext } from '../../hooks/useTodosContext.ts'
import type { Todo } from '../../types.ts'

type TodoItemProps = {
  todo: Todo,
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { deleteTodo, toggleTodo } = useTodosContext()

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  const handleToggle = () => {
    toggleTodo(todo.id, todo.completed)
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleToggle} className="toggle">{todo.completed ? 'Undo' : 'Completed'}</button>
    </li>
  )
}