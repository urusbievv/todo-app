const API_URL: string = import.meta.env.VITE_SERVER_URL;

export const TODOS_API = Object.freeze({
  GET_TODO_LIST: API_URL,
  CREATE_TODO: API_URL,
  DELETE_TODO: (id: number | string) : string  => {
    const url = `${API_URL}/${id}`;
    console.log('DELETE URL:', url);
    return url;
  },
  GET_TODO_BY_ID: (id: number | string): string => `${API_URL}/${id}`, 
  UPDATE_TODO: (id: number | string): string => `${API_URL}/${id}`
});
