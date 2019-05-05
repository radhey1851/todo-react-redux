import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import TodoApp from './TodoApp';
import store from './redux/store';
import './index.css';

const root = document.getElementById('root');
ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>,
    root,
);
