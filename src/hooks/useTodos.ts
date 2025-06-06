import { useEffect, useState } from 'react'
import type { Todo } from '../types.ts'
import { todoApi } from '../api/todoApi.ts'

export const useTodos = ()=>{
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTodos = async () => {
    setError(null)
    setIsLoading(true)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error(error)
      setError('Failed to fetch todos')
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    setError(null)
    setIsLoading(true)
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => [...prevTodos, newTodo])
    } catch (error) {
      console.error(error)
      setError('Failed to add todo')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTodo = async (todoId: number) => {
    setError(null)
    setIsLoading(true)
    try {
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error(error)
      setError('Failed to delete todo')
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTodo = async (todoId:number, completed:boolean) => {
    setError(null)
    setIsLoading(true)
    try {
      const updatedTodo = await todoApi.toggleTodo(todoId, !completed)
      setTodos((prevTodos)=>prevTodos.map((todo)=> todo.id===todoId ? updatedTodo: todo))
    } catch (error) {
      console.error(error)
      setError('Failed to toggle todo')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return {
    todos,
    isLoading,
    addTodo,
    deleteTodo,
    toggleTodo,
    error,
    refetch: fetchTodos,
  }
}