import React from 'react';
import styled from "styled-components"

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  overflow-y: scroll;
  max-height: 100%;
  padding: 0 5px;
`;

export const TodoItemsContainer = (props) => { 
  return <Root>{props.children}</Root>
}