
let nextId = (sessionStorage.getItem('nextId') || 1) % 10000;

export const addTodo = (content) => {
    sessionStorage.setItem('nextId', nextId + 1);
    return ({
        type: 'ADD_TODO',
        payload: {
            id: nextId++,
            content,
        },
    });
};

export const deleteTodo = id => ({
    type: 'DEL_TODO',
    payload: {
        id,
    },
});

export const editTodo = (id, content) => ({
    type: 'EDIT_TODO',
    payload: {
        id,
        content,
    },
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    payload: {
        id,
    },
});

export const clearCompleted = () => ({
    type: 'CLEAR_COMPLETED',
});

export const setFilter = filter => ({
    type: 'SET_FILTER',
    payload: {
        filter,
    },
});
