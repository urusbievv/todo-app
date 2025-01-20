import axios, { AxiosRequestConfig } from 'axios';
import { TODOS_API } from './todos';


type HttpMethod = 'get' | 'post' | 'delete' | 'put' 

async function apiRequest<T>(method: HttpMethod, url: string, data: T | null = null): Promise<any> {
  try {
    const config: AxiosRequestConfig = { method, url, data }
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error API:', error instanceof Error ? error.message : 'Unknown error');
    throw null;
  }
}

interface Todo {
  id?: number
  title: string
  completed: boolean // статус выполения задачи
}

export const fetchTodos = (): Promise<Todo[]> => apiRequest<Todo[]>('get', TODOS_API.GET_TODO_LIST)

export const createTodo = (todo: Todo): Promise<Todo> => apiRequest<Todo>('post', TODOS_API.CREATE_TODO, todo);

export const deleteTodo = (id: number): Promise<void> => apiRequest<void>('delete', TODOS_API.DELETE_TODO(id))

export const fetchTodoById = (id: number): Promise<Todo> => apiRequest<Todo>('get', TODOS_API.GET_TODO_BY_ID(id))

export const updateTodo = (id: number, todo: Todo): Promise<Todo> => apiRequest<Todo>('put', TODOS_API.UPDATE_TODO(id), todo)

