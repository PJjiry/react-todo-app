import type { Todo } from '../types.ts'

const API_URL = "https://eli-workshop.vercel.app/api/users/jirp13/todos"

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'Api Error'
  }
}

const handleResponse = async<T>(response: Response):Promise<T> => {
  if(!response.ok){
    throw new ApiError(`API request failed ${response.status}`)
  }
  return await response.json()
}

export const todoApi = {
  async fetchTodos():Promise<Todo[]>{
    const response = await fetch(API_URL)
    return handleResponse<Todo[]>(response)
  },
  async createTodo(newTodo:string){
    const body = {
      name: newTodo,
    }
    const response = await fetch(API_URL,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    return handleResponse<Todo>(response)
  },
  async deleteTodo(id:number){
    const response = await fetch(`${API_URL}/${id}`,{
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
    })
    return handleResponse(response)
  },
  async toggleTodo(id:number, completed:boolean){
    const body = {
      completed: completed,
    }
    const response= await fetch(`${API_URL}/${id}`,{
      method: 'PATCH',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return handleResponse<Todo>(response)
  },
  async fetchTodo(id:number){
    const response = await fetch(`${API_URL}/${id}`)
    return handleResponse<Todo>(response)
  }
}