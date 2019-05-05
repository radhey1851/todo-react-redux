
const loadInitialState = () => {
    const defaultInitialTodoState =  {
        visibilityFilter: 'all',
    };

    return JSON.parse(sessionStorage.getItem('visibilityFilter')) || defaultInitialTodoState;
};


const INITIAL_STATE = loadInitialState();

const visibilityFilter = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'SET_FILTER': {
        const nowFilter = action.payload.filter;
        sessionStorage.setItem('visibilityFilter', JSON.stringify(nowFilter));
        return nowFilter;
    }
    default: {
        return state;
    }
    }
};

export default visibilityFilter;
