import { TodosProvider } from './providers/todos.provider.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './components/Layout.tsx'
import TodoListPage from './components/pages/TodoList.page.tsx'
import { lazy, Suspense } from 'react'
import { Spinner } from './components/Spinner.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TodoDetailPage = lazy(() => import('./components/pages/TodoDetail.page.tsx'))

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <TodosProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TodoListPage />} />
              <Route path="/todos/:id"
                     element={
                       <Suspense fallback={<Spinner />}>
                         <TodoDetailPage />
                       </Suspense>
                     } />
              <Route path="*" element={<div>Not found</div>} />
            </Routes>
          </BrowserRouter>
        </TodosProvider>
      </Layout>
    </QueryClientProvider>
  )
}

export default App
