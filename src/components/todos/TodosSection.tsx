import { TodoForm } from './TodoForm.tsx'
import { TodoItem } from './TodoItem.tsx'
import { Spinner } from '../Spinner.tsx'
import { useTodos } from '../../hooks/useTodos.ts'
import { ErrorMessage } from '../ErrorMessage.tsx'


export const TodosSection = () => {
  const { todos, isLoading, addTodo, deleteTodo, toggleTodo, error, refetch } = useTodos()

  return (
    <main>
      {error && <ErrorMessage message={error} onDismiss={refetch}/>}
      <TodoForm addTodo={addTodo} />
      <div className="todo-container">
        <ul id="todo-list" className={isLoading && todos.length ? 'isLoading' : ''}>
          {todos.map((todo) => {
            return <TodoItem key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} todo={todo} />
          })}
        </ul>
        {isLoading && !todos.length && <Spinner/>}
      </div>
    </main>
  )
}