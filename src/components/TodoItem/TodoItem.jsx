import React from 'react';
import styled, {css} from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {TodoItemDelete} from "./TodoItemDelete";
import {TodoItemPriority} from "./TodoItemPriority";

const checkedCss = css`
    color: #B5B5BA;
    text-decoration: line-through;
`

const Title = styled.span(props => {
    return `
     font-size: 15px;
     flex-grow: 1;
     word-break: break-word; 
     overflow-wrap: break-word; 
     white-space: pre-wrap; 
     min-width: 0; /* Позволяет flex-элементу сжиматься */
    ${props.checked ? checkedCss : ''};
  `;
})


export const TodoItem = ({title, checked, todoId, priorityValue, onPriorityChange }) => {

    return (
        <TodoItemContainer>
            <TodoItemCheckbox todoId={todoId} checked={checked}/>
            <Title checked={checked}>
                {title}
            </Title>
            <TodoItemDelete todoId={todoId}/>
            <TodoItemPriority priorityValue={priorityValue} todoId={todoId} onChange={onPriorityChange} />
        </TodoItemContainer>
    )
}

