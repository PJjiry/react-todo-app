import { type ChangeEvent, useState } from 'react'
import { useTodosContext } from '../../hooks/useTodosContext.ts'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState<string>('')
  const { addTodo } = useTodosContext()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    if(!todoName.trim()){
      return
    }
    addTodo(todoName)
    setTodoName('')
  }

  return(
      <div className="input-group">
        <input name="todo-text" placeholder="What needs to be done?" value={todoName} onChange={handleInputChange} />
        <button onClick={handleSubmit}>
          Add
        </button>
      </div>
  )
}