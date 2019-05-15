import React from 'react';
import TodoBox from '../components/Todo/TodoBox';

import './TodoBoxContainer.css';

const TodoBoxContainer = (props) => {
    return(
        <div id = "todo-container">
            <TodoBox email={props.email} addTodo={props.addTodo}/>
        </div>
    )
};

export default TodoBoxContainer;
