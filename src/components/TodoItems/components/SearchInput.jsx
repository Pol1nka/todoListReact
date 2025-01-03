import React from 'react';
import {styled} from 'styled-components';


const Input = styled.input``;

// Разобраться, почему не срабатывает ввод символов в строку
//потому что мы не делали setSearchValue!
export const SearchInput = ({value, setValue}) => {
  const onInputChange = (event) => {
    if (setValue) { 
      setValue(event.nativeEvent.target.value);
    }
  }

  return <Input value={value} onChange={onInputChange} placeholder='Поиск' />
}