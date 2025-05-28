import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, todoApi } from '../api/todoApi.ts'
import type { Todo } from '../types.ts'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<Todo, ApiError, string, {previousTodos:Todo[]|undefined}>({
    mutationKey: ['createTodo'],
    mutationFn: async (name: string) => await todoApi.createTodo(name),
    onMutate: async (todoName) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
        return [...(oldTodos) || [], { name: todoName, id: Date.now(), completed: false }]
      })
      return {previousTodos}
    }, //zavola se hnedka jak provedu request, neceka na odpoved - zmeni cache dopredu, je to optimistic update - id se po refetchi zmeni
    onError: async (_error: Error, _v, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }), //invalidateQueries udela refetch dle queryKey
  })
}