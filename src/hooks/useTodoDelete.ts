import { todoApi } from '../api/todoApi.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useTodoDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey:["deleteTodo"],
    mutationFn: async (id:number) => await todoApi.deleteTodo(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })
};