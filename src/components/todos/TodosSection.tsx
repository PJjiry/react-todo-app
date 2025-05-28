import { TodoForm } from './TodoForm.tsx'
import { TodoItem } from './TodoItem.tsx'
import { Spinner } from '../Spinner.tsx'
import { ErrorMessage } from '../ErrorMessage.tsx'
import { useTodosQuery } from '../../hooks/useTodosQuery.ts'


export const TodosSection = () => {
 const{data: todos, isLoading, error, refetch} = useTodosQuery()

  return (
    <main>
      {error && <ErrorMessage message={error.message} onDismiss={refetch}/>}
      <TodoForm />
      <div className="todo-container">
        <ul>
          {todos?.map((todo) => {
            return <TodoItem key={todo.id} todo={todo}/>
          })}
        </ul>
        {isLoading && <Spinner/>}
      </div>
    </main>
  )
}