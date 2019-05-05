import React from 'react';
import AddTodo from  './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import './TodoApp.css';

const TodoApp = () => (
    <div className="todo-app">
        <div className="todo-title">
            <h2>Todo List</h2>
        </div>
        <div className="todo-frame">
            <AddTodo />
            <TodoList />
            <Footer />
        </div>
    </div>
);

export default TodoApp;
