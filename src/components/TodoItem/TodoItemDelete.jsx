import styled from "styled-components";
import {useDeleteToDoItem} from "../../data/hooks/useData";

export const Delete = styled.span`
    display: inline-block;
    min-width: 13px;
    min-height: 13px;
    background-image: url(/assets/images/png/delete.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 13px;
    margin-left: 5px;
    cursor: pointer;
    flex-shrink: 0;
    
    &:hover{
        background-color: #80808033;
        border-radius: 3px;
        transition: all 0.15s ease-in-out;
    }
`;


export const TodoItemDelete = ({todoId}) => {
    const {mutate} = useDeleteToDoItem();
    const onButtonClick = () => {
        const confirmDelete = window.confirm("Вы действительно хотите удалить эту заметку?");
        if (confirmDelete) {
            console.log(todoId);
            mutate({toDoId: todoId});
        }
    }
    //Дописать что будет иначе
    return <Delete onClick={onButtonClick} />
}