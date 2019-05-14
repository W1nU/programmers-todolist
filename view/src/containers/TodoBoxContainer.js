import React from 'react';
import TodoBox from '../components/Todo/TodoBox';

import './TodoBoxContainer.css';

const TodoBoxContainer = () => {
    return(
        <div id = "todo-container">
            <TodoBox/>
        </div>
    )
};

export default TodoBoxContainer;
