import styled, {css} from "styled-components";

const priorityColors = {
    1: 'hsl(120, 50%, 90%)', // Зеленый
    2: 'hsl(60, 50%, 85%)', // Желтый
    3: 'hsl(30, 50%, 80%)', // Оранжевый
    4: 'hsl(0, 50%, 75%)',  // Красный (чуть светлее)
    5: 'hsl(350, 70%, 70%)', // Более насыщенный розовый/красный, и темнее
};
const Select = styled.select`
    margin-left: 10px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    max-width: 45px;
    max-height: 30px;
    
    ${({ priorityValue }) => { 
        const backgroundColor = priorityColors[priorityValue] || 'white';
        return css`
      background-color: ${backgroundColor};
    `;
    }}

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
    }
`;


export const TodoItemPriority = ({priorityValue, onChange}) => {
    const check = () => {
        console.log(priorityValue)
    }
    const handlePriorityChange = (event) => {
        const newPriority = parseInt(event.target.value);
        onChange(newPriority); // Вызываем обработчик с новым приоритетом и todoId
    };
    return (
        <Select priorityValue={priorityValue} value={priorityValue} onChange={handlePriorityChange} onClick={check}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </Select>
    );
}