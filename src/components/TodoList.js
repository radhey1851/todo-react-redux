/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Todo from './Todo';
import { getTodosByVisibilityFilter } from '../redux/selector';
import './TodoList.css';


const TodoList = ({ todos, visibilityFilter }) => {
    // state hook to manage sorting of items
    const [sort, setSort] = useState(undefined);

    function sorter() {
        if (sort) {
            const newSortState = sort === '^' ? 'v' : '^';
            setSort(newSortState);
        } else {
            setSort('v');
        }
    }

    function mapTodos(todos) {
        return (todos && todos.length
            ? todos.map(todo => (<Todo key={todo.id} todo={todo} />))
            : null);
    }

    function renderList(sortState) {
        if (!sortState) {
            return mapTodos(todos);
        }
        if (sortState === '^') {
            const sortedTodos = [
                ...todos.filter(todo => todo.completed),
                ...todos.filter(todo => !todo.completed),
            ];
            return mapTodos(sortedTodos);
        }
        if (sortState === 'v') {
            const sortedTodos = [
                ...todos.filter(todo => !todo.completed),
                ...todos.filter(todo => todo.completed),
            ];
            return mapTodos(sortedTodos);
        }

        return null;
    }

    return (
        <div className="todo-list">
            <div
                className={todos && todos.length >= 2
                && (visibilityFilter !== 'incomplete' && visibilityFilter !== 'completed')
                    ? 'sorter visible' : 'sorter'}
                onClick={() => sorter()}
            >
                { sort || 'v' }
            </div>
            <ul>
                { renderList(sort) }
            </ul>
        </div>
    );
};


export default connect(
    state => ({
        todos: getTodosByVisibilityFilter(state, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter,
    }),
)(TodoList);
