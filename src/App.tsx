import { TodosProvider } from './providers/todos.provider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout.tsx'
import TodoListPage from './components/pages/TodoList.page.tsx'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/Spinner.tsx'

const TodoDetailPage = lazy(() => import('./components/pages/TodoDetail.page.tsx'))

function App() {
  return (
    <Layout>
      <TodosProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TodoListPage />} />
            <Route path="/todos/:id"
                   element={
                     <Suspense fallback={<Spinner/>}>
                       <TodoDetailPage />
                     </Suspense>
                   }/>
            <Route path="*" element={<div>Not found</div>} />
          </Routes>
        </BrowserRouter>
      </TodosProvider>
    </Layout>
  )
}

export default App
