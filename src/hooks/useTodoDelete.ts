import { todoApi } from '../api/todoApi.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Todo } from '../types.ts'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey:["deleteTodo"],
    mutationFn: async (id:number) => await todoApi.deleteTodo(id),
    onMutate: async (id) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
        return oldTodos?.filter((todo)=>todo.id !== id)
      })
      return {previousTodos}
    },
    onError: async (_error: Error, _v, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })
};