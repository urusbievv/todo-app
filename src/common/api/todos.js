const API_URL = import.meta.env.VITE_SERVER_URL;

export const TODOS_API = Object.freeze({
  GET_TODO_LIST: `${API_URL}`,
  CREATE_TODO: `${API_URL}`,
  DELETE_TODO: (id) => {
    const url = `${API_URL}/${id}`;
    console.log('DELETE URL:', url);
    return url;
  },
  GET_TODO_BY_ID: (id) => `${API_URL}/${id}`, 
  UPDATE_TODO: (id) => `${API_URL}/${id}`
});
