import type { Todo } from '../../types.ts'

type TodoItemProps = {
  todo: Todo,
  deleteTodo: (todoId: number) => void
  toggleTodo: (todoId: number, completed: boolean) => void
}

export const TodoItem = ({ todo, deleteTodo, toggleTodo }: TodoItemProps) => {

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