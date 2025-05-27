import { TodoForm } from './TodoForm.tsx'
import { TodoItem } from './TodoItem.tsx'
import { useEffect, useState } from 'react'
import type { Todo } from '../../types.ts'
import { todoApi } from '../../api/todoApi.ts'


export const TodosSection = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const fetchTodos = async () => {
    try {
      const data = await todoApi.fetchTodos()
      setTodos(data)
    } catch (error) {
      console.error(error)
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

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <main>
      <TodoForm addTodo={addTodo} />
      <div className="todo-container">
        <ul id="todo-list">
          {todos.map((todo) => {
            return <TodoItem key={todo.id} deleteTodo={deleteTodo} todo={todo} />
          })}
        </ul>
      </div>
    </main>
  )
}