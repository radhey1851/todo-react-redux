import { createStore } from 'redux';
import rootReducer from './reducers/index';


export default createStore(rootReducer,
    window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
