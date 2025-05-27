import { TodoForm } from './TodoForm.tsx'
import { TodoItem } from './TodoItem.tsx'
import { useEffect, useState } from 'react'
import type { Todo } from '../../types.ts'
import { todoApi } from '../../api/todoApi.ts'
import { Spinner } from '../Spinner.tsx'


export const TodosSection = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchTodos = async () => {
    setIsLoading(true)
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const addTodo = async (todoName: string) => {
    try {
      const newTodo = await todoApi.createTodo(todoName)
      setTodos((prevTodos) => [...prevTodos, newTodo])
    } catch (error) {
      console.error(error)
    }
  }

  const deleteTodo = async (todoId: number) => {
    try {
      await todoApi.deleteTodo(todoId)
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId))
    } catch (error) {
      console.error(error)
    }
  }

  const toggleTodo = async (todoId:number, completed:boolean) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(todoId, !completed)
      setTodos((prevTodos)=>prevTodos.map((todo)=> todo.id===todoId ? updatedTodo: todo))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main>
      <TodoForm addTodo={addTodo} />
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => {
            return <TodoItem key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} todo={todo} />
          })}
        </ul>
        {isLoading && !todos.length && <Spinner/>}
      </div>
    </main>
  )
}