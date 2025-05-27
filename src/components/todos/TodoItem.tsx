import type { Todo } from '../../types.ts'

type TodoItemProps = {
  todo: Todo,
  deleteTodo: (todoId:number) => void
}

export const TodoItem = ({todo, deleteTodo}:TodoItemProps) => {

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  return (
    <li>
      <span>{todo.name}</span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  )
}