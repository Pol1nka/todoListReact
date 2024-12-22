import styled from 'styled-components';

const Root = styled.div `
  display: flex;
  gap: 9px;
  align-items: center;
  padding: 5px 0;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`

export const TodoItemContainer = ({children}) => {
  return <Root>{children}</Root>
}