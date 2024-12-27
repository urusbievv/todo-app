const API_URL = import.meta.env.VITE_SERVER_URL;

export const TODOS_API = Object.freeze({
  GET_TODO_LIST: `${API_URL}`,
  CREATE_TODO: `${API_URL}`,
  DELETE_TODO: (id) => `${API_URL}/${id}`,
});
