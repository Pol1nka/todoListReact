import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData, useUpdateToDoItemPriority} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import {SortButtons} from "./components/PrioritySort";

export const TodoItems = () => {
  const { mutate: updatePriority } = useUpdateToDoItemPriority();
  const [searchValue, setSearchValue] = useState('');
  const [sortDirection, setSortDirection] = useState('none');
  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }
  const handleSortAsc = () => {
    setSortDirection('asc');
  };

  const handleSortDesc = () => {
    setSortDirection('desc');
  };

  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedTodoItemTitle = todoItem.title.toLowerCase().replace(/\s+/g, '');
    const clearedSearchValue = searchValue.toLowerCase().replace(/\s+/g, '');
    return clearedTodoItemTitle.indexOf(clearedSearchValue) !== -1;
  })

  // сортировочка
  const sortedItems = [...filteredBySearchItems].sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.priority - b.priority;
    } else if (sortDirection === 'desc') {
      return b.priority - a.priority;
    } else {
      return 0;
    }
  });

  const todoItemsElements = sortedItems.map((item, index) => {
    const handlePriorityChange = (newPriority) => {
      updatePriority({ toDoId: item.id, newPriority: newPriority });
    };

    return <TodoItem key={item.id} title={item.title} checked={item.isDone} todoId={item.id} priorityValue={item.priority} onPriorityChange={handlePriorityChange} />;
  });

  const handleSearchValue = (newValue) => {
    setSearchValue(newValue);
  }

  return (
    <TodoItemsContainer>
      <SearchInput value={searchValue} setValue={handleSearchValue} />
      <SortButtons onSortAsc={handleSortAsc} onSortDesc={handleSortDesc}/>
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}