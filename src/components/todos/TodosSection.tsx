import { TodoForm } from './TodoForm.tsx'
import { TodoItem } from './TodoItem.tsx'
import { Spinner } from '../Spinner.tsx'
import { ErrorMessage } from '../ErrorMessage.tsx'
import { useTodosContext } from '../../hooks/useTodosContext.ts'


export const TodosSection = () => {
  const { todos, isLoading, error, refetch } = useTodosContext()

  return (
    <main>
      {error && <ErrorMessage message={error} onDismiss={refetch}/>}
      <TodoForm />
      <div className="todo-container">
        <ul id="todo-list" className={isLoading && todos.length ? 'isLoading' : ''}>
          {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo}/>
          })}
        </ul>
        {isLoading && !todos.length && <Spinner/>}
      </div>
    </main>
  )
}