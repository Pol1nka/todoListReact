const TODO_ITEMS_LOCAL_STORAGE_KEY = 'TODO_ITEMS_LOCAL_STORAGE_KEY';

export const LocalStorage = {
  getTodoItemsFromLocalStorage: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const rawData = localStorage.getItem(TODO_ITEMS_LOCAL_STORAGE_KEY);
        const defaultResult = [];
        
        if (!rawData) {
          resolve(defaultResult);
          return;
        }
        const data = JSON.parse(rawData);
    
        if (!Array.isArray(data)) {
          resolve(defaultResult);
          return;
        }
    
        resolve(data);
      }, 500);
    })
  },

  saveTodoItemToLocalStorage: (todoItem) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const newTodoItems = [...todoItems, todoItem];
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(newTodoItems));
        resolve();
      })
    });
  },

  deleteTodoItemFromLocalStorage: (todoItemId) => {
    return new Promise((resolve, reject) => {
       LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
         const filteredToDoItems = todoItems.filter((item) => item.id !== todoItemId);
         localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(filteredToDoItems));
         resolve();
       })
    })
  },
  checkTodoItemFromLocalStorage: (todoItemId) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const updatedToDoItems = todoItems.map((element) => {
          if (element.id === todoItemId) {
            return { ...element, isDone: !element.isDone };
          }
          return element;
        });
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedToDoItems));
        resolve();
      })
    })
  },
  updateTodoItemInLocalStorage: (todoId, newPriority) => {
    return new Promise((resolve, reject) => {
      LocalStorage.getTodoItemsFromLocalStorage().then((todoItems) => {
        const updatedTodoItems = todoItems.map(item => {
          if (item.id === todoId) {
            return { ...item, priority: newPriority };
          }
          return item;
        });
        localStorage.setItem(TODO_ITEMS_LOCAL_STORAGE_KEY, JSON.stringify(updatedTodoItems));
        resolve();
      })
    })
  }
}