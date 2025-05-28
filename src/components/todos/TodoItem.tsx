import type { Todo } from '../../types.ts'
import { Link } from 'react-router'
import { useTodoDelete } from '../../hooks/useTodoDelete.ts'
import { useTodoToggle } from '../../hooks/useTodoToggle.ts'

type TodoItemProps = {
  todo: Todo,
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const { mutate:deleteTodo } = useTodoDelete()
  const { mutate:toggleTodo } = useTodoToggle()

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  const handleToggle = () => {
    toggleTodo(todo)
  }

  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span>{todo.name}</span>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleToggle} className="toggle">{todo.completed ? 'Undo' : 'Completed'}</button>
      <Link className='link' to={`/todos/${todo.id}`}>Go to detail</Link>
    </li>
  )
}