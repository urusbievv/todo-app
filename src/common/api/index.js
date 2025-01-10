import axios from 'axios';
import { TODOS_API } from './todos';

async function apiRequest(method, url, data = null) {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error('Error API:', error.message);
    throw null;
  }
}

export const fetchTodos = () => apiRequest('get', TODOS_API.GET_TODO_LIST)

export const createTodo = (todo) => apiRequest('post', TODOS_API.CREATE_TODO, todo)

export const deleteTodo = (id) => apiRequest('delete', TODOS_API.DELETE_TODO(id))

export const fetchTodoById = (id) => apiRequest('get', TODOS_API.GET_TODO_BY_ID(id))

export const updateTodo = (id, todo) => apiRequest('put', TODOS_API.UPDATE_TODO(id), todo)

