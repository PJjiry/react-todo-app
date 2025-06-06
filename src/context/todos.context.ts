import type { Todo } from '../types.ts'
import { createContext } from 'react'

type TodosContext={
  todos: Todo[]
  isLoading: boolean
  error: string | null
  addTodo: (todoName:string) => Promise<void>
  deleteTodo: (todoId: number) => Promise<void>
  toggleTodo: (todoId: number, completed: boolean) => Promise<void>
  refetch: () => Promise<void>
}

export const TodosContext = createContext<TodosContext | undefined>(undefined)