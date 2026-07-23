import client from './client';

export const getTasks = () => client.get('/api/tasks').then((res) => res.data);
export const createTask = (task) => client.post('/api/tasks', task).then((res) => res.data);
export const updateTask = (id, updates) => client.patch(`/api/tasks/${id}`, updates).then((res) => res.data);
export const deleteTask = (id) => client.delete(`/api/tasks/${id}`).then((res) => res.data);