import React from 'react';
import TodoBox from '../components/Todo/TodoBox';

import './TodoBoxContainer.css';

const TodoBoxContainer = (props) => {
    return(
        <div id = "todo-container">
            <TodoBox
                email={props.email}
                addTodo={props.addTodo}
                todo={props.todo}
                modiTodo={props.modiTodo}
                deleteTodo={props.deleteTodo}
                setSelected={props.setSelected}
                doneTodo = {props.doneTodo}
                needRefreshTodo = {props.needRefreshTodo}
            />
        </div>
    )
};

export default TodoBoxContainer;
