import { Header } from '../Header.tsx'
import { TodosSection } from '../todos/TodosSection.tsx'

const TodoListPage = () => {
  return (
    <>
      <Header title="My Todo list" subtitle="Add your tasks" />
      <TodosSection />
      <footer>
        <p>Click on a task to mark it as completed</p>
      </footer>
    </>
  )
}

export default TodoListPage