import { useSuspenseQuery } from '@tanstack/react-query'
import { todoApi } from '../api/todoApi.ts'
import { useParams } from 'react-router'

export const useTodoQuery = () => {
  const params = useParams()

  return useSuspenseQuery({ //odchyti suspense
    queryKey:["todo", params.id],
    queryFn: () => todoApi.fetchTodo(Number(params.id)),
  })
};