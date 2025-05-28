import { todoApi } from '../api/todoApi.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useTodoToggle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey:["toggleTodo"],
    mutationFn: async (todo:{id:number, completed:boolean}) => await todoApi.toggleTodo(todo.id, !todo.completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })
};