import { type ChangeEvent, useState } from 'react'

type TodoFormProps = {
  addTodo: (todoName:string) => void
}

export const TodoForm = ({ addTodo }:TodoFormProps) => {
  const [todoName, setTodoName] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {
    if(!todoName){
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