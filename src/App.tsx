import { Header } from './components/Header.tsx'
import { TodosSection } from './components/todos/TodosSection.tsx'
import { TodosProvider } from './providers/todos.provider.tsx'

function App() {
  return (
    <TodosProvider>
      <div className="container">
        <Header title="My Todo list" subtitle="Add your tasks" />
        <TodosSection />
        <footer>
          <p>Click on a task to mark it as completed</p>
        </footer>
      </div>
    </TodosProvider>
  )
}

export default App
