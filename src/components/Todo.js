/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */

import React from 'react';
import { connect } from 'react-redux';

import { toggleTodo, deleteTodo, editTodo } from '../redux/actions';
import './Todo.css';

/*
* note: Find why the re-render happens on toggleTodo when the component is a Func,
* but not when its  a Class
*/


function Todo(props) {
    const { todo } = props;

    const cls = todo.completed
        ? 'todo-item complete'
        : 'todo-item';
    const labelRef = React.createRef();


    // For the Delete 'x' button
    const handleBtnClick = (e) => {
        props.deleteTodo(todo.id);
        // To prevent click from bubbling to top li element and triggering a toggleTodo action
        e.stopPropagation();
    };

    const handleDoubleClick = () => {
        const node = labelRef.current;
        node.contentEditable = true;
        node.focus();

        node.onkeydown = (event) => {
            if (event.key === 'Enter') {
                node.contentEditable = false;
            }
        };

        node.onblur = () => {
            node.contentEditable = false;
            // Dispatch Action to edit the content in store
            props.editTodo(todo.id, node.textContent.trim());
        };
    };


    return (
        <div>
            <li className={cls}>
                <div className="view">
                    {todo.completed
                        ? <input className="check-square" type="checkbox" onClick={() => props.toggleTodo(todo.id)} checked />
                        : <input className="check-square" onClick={() => props.toggleTodo(todo.id)} type="checkbox" />}
                    <label
                        ref={labelRef}
                        className="edit"
                        onFocus={e => e.stopPropagation()}
                        onDoubleClick={handleDoubleClick}
                    >
                        { todo.content}
                    </label>
                    <button type="button" onClick={handleBtnClick}>X</button>
                </div>
            </li>
            <hr />
        </div>
    );
}



export default connect(null, { deleteTodo, toggleTodo, editTodo })(Todo);
