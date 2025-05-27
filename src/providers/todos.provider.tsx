import { useTodos } from '../hooks/useTodos.ts'
import { TodosContext } from '../context/todos.context.ts'
import type { ReactNode } from 'react'

type TodosProviderProps = {
  children: ReactNode
}

export const TodosProvider = ({children}:TodosProviderProps)=>{
  const todosState = useTodos()

  return <TodosContext.Provider value={todosState}>{children}</TodosContext.Provider>
}