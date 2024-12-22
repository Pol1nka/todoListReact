import styled, {css} from "styled-components";
import {useCheckToDoItem} from "../../data/hooks/useData";

const disabledCss = css`
  background-color: #E2E2E2;
  border-width: 0;
`

const checkedCss = css`
  border-color: #B5B5BA;
  background-color: #B5B5BA;
  background-image: url(/assets/images/svg/todo-done.svg);
  background-position: center;
  background-repeat: no-repeat;
`

export const CheckboxContainer = styled.span(props => {
  return `
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid #C4C4C4;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 5px;
    flex-shrink: 0;
    ${props.disabled ? disabledCss : ''}
    ${props.checked ? checkedCss : ''}
  `;
});


export const TodoItemCheckbox = ({disabled, checked, todoId}) => {
  const {mutate} = useCheckToDoItem();
  const logElement = () => {
    mutate({toDoId: todoId});
  }
  return <CheckboxContainer onClick={logElement} disabled={disabled} checked={checked} />
}