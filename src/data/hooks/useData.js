import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['todo'],
    queryFn: LocalStorage.getTodoItemsFromLocalStorage,
  });

  return {
    data,
    isLoading,
  };
}

export const useSaveNewTodoItem = () => {
  const client = useQueryClient();

  const {mutate, isPending, isSuccess} = useMutation({
    mutationFn: ({title, priority}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, priority);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate,
    isPending,
    isSuccess
  }
}

export const useDeleteToDoItem = () => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: ({toDoId}) => {
      return LocalStorage.deleteTodoItemFromLocalStorage(toDoId);
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate
  }
}

export const useCheckToDoItem = () => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: ({toDoId}) => {
      return LocalStorage.checkTodoItemFromLocalStorage(toDoId);
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate
  }
}

export const useUpdateToDoItemPriority = () => {
  const client = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: ({toDoId, newPriority}) => {
      return LocalStorage.updateTodoItemInLocalStorage(toDoId, newPriority);
    },
    onSuccess: () => {
      client.invalidateQueries(['todo']);
    },
  });

  return {
    mutate
  }
}
