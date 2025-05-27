import { type ChangeEvent, useState } from 'react'

export const TodoForm = () => {
  const [todoName, setTodoName] = useState<string>('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodoName(e.target.value)
  }

  const handleSubmit = () => {

  }

  return(
      <div className="input-group">
        <input name="todo-text" id="new-todo-input" placeholder="What needs to be done?" value={todoName} onChange={handleInputChange} />
        <button onClick={handleSubmit} type="submit" id="add-btn">
          Add
        </button>
      </div>
  )
}