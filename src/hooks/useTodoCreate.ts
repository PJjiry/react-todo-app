import { useMutation, useQueryClient } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi.ts'

export const useTodoCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createTodo'],
    mutationFn: async (name: string) => await todoApi.createTodo(name),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }), //invalidateQueries udela refetch dle queryKey
  })
}