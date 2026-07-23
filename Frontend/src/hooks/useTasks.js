import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask } from '../api/tasks';

export function useTasks() {
  return useQuery({ queryKey: ['tasks'], queryFn: getTasks });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });
}