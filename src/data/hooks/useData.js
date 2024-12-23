import {LocalStorage} from '../services/LocalStorage';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {TodoItem} from '../entity/TodoItem'

export const useData = () => {
  //получение данных из какого-либо источника (LS)
  //но!
  //мы не просто получаем данные 1 раз, а фактически "подписываемся" на изменение данных по ключу todoи когда мы инвалидируем данные, происходит их обновление здесь
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
  //тот же клиент, который был создан в апе
  const client = useQueryClient();

  //хук для выполнения мутации (то есть изменения) данных
  const {mutate, isPending, isSuccess} = useMutation({
    //функция которая выполняет мутацию
    mutationFn: ({title, priority}) => {
      const newTodoItem = new TodoItem(new Date().getTime(), title, false, priority);
      return LocalStorage.saveTodoItemToLocalStorage(newTodoItem)
    },
    //выполняется после успешного завершения мутации
    onSuccess: () => {
      //по сути удаляет данные с ключом туду из кэша, что приводит к тому, что useQuery в юздата автоматически выполнит новый запрос, чтобы обновить список
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
