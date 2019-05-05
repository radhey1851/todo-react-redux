const loadInitialState = () => {
    const defaultInitialTodoState = {
        allIds: [],
        byIds: {},
    };

    return JSON.parse(sessionStorage.getItem('todos')) || defaultInitialTodoState;
};

const INITIAL_STATE = loadInitialState();

const todos = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'ADD_TODO': {
        const { id, content } = action.payload;
        const newState = {
            ...state,
            allIds: state.allIds.concat(id),
            byIds: {
                ...state.byIds,
                [id]: {
                    content,
                    completed: false,
                },
            },
        };
        sessionStorage.setItem('todos', JSON.stringify(newState));
        return newState;
    }
    case 'CLEAR_COMPLETED': {
        const pruned_allIds = state.allIds.filter(val => !state.byIds[val].completed);
        let pruned_byIds = {...state.byIds};
        let deletedVal;

        pruned_allIds.forEach((val) => {
            if (state.byIds[val].completed) {
                // reduce pruned_byIds for each non needed value
                ({ [val]: deletedVal, ...pruned_byIds} = pruned_byIds);
            }
        });

        const newState = {
            allIds: pruned_allIds,
            byIds: pruned_byIds,

        };
        sessionStorage.setItem('todos', JSON.stringify(newState));
        return newState;
    }

    case 'DEL_TODO': {
        const { id } = action.payload;
        const pruned_allIds = state.allIds.filter(val => val !== id);
        // Destructuring to not mutate byIds
        const { [id]: deletedVal, ...pruned_byIds} = state.byIds; 

        const newState = {
            allIds: pruned_allIds,
            byIds: pruned_byIds,
        };

        sessionStorage.setItem('todos', JSON.stringify(newState));
        return newState;
    }

    case 'EDIT_TODO': {
        const { id, content } = action.payload;
        if (state.byIds[id].content === content) return state;

        const newState = {
            ...state,
            byIds: {
                ...state.byIds,
                [id]: {
                    ...state.byIds[id],
                    content,
                },
            },
        };

        sessionStorage.setItem('todos', JSON.stringify(newState));
        return newState;
    }

    case 'TOGGLE_TODO': {
        const { id } = action.payload;
        const newState = {
            ...state,
            byIds: {
                ...state.byIds,
                [id]: {
                    ...state.byIds[id],
                    completed: !state.byIds[id].completed,
                },
            },
        };
        sessionStorage.setItem('todos', JSON.stringify(newState));
        return newState;
    }
    default:
        return state;
    }
};

export default todos;
