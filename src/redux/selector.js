
export const getTodoList = store => (store && store.todos ? store.todos.allIds : []);


export const getTodoById = (store, id) => (
    store && store.todos && store.todos.byIds
        ? { ...store.todos.byIds[id], id }
        : {}
);

export const getTodos = store => (
    getTodoList(store).map(id => getTodoById(store, id))
);

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
    const list = getTodos(store);
    switch (visibilityFilter) {
    case 'completed': {
        return list.filter(todo => todo.completed);
    }
    case 'incomplete': {
        return list.filter(todo => !todo.completed);
    }
    default:
        return list;
    }
};
