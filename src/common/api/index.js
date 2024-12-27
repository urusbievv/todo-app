import axios from 'axios';
import { TODOS_API } from './todos';

async function apiRequest(apiCall) {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.error('Error API:', error.message);
    throw new Error(error.response?.data?.message || 'Error with API');
  }
}

export const fetchTodos = () => apiRequest(() => axios.get(TODOS_API.GET_TODO_LIST));

export const createTodo = (todo) => apiRequest(() => axios.post(TODOS_API.CREATE_TODO, todo));

export const deleteTodo = (id) => apiRequest(() => axios.delete(TODOS_API.DELETE_TODO(id)));
