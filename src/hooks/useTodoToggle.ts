import { todoApi } from '../api/todoApi.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Todo } from '../types.ts'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey:["toggleTodo"],
    mutationFn: async (todo:{id:number, completed:boolean}) => await todoApi.toggleTodo(todo.id, !todo.completed),
    onMutate: async (todo) => {
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos) => {
        return oldTodos?.map((item)=> todo.id===item.id ? { ...item, completed:!item.completed }: item)
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