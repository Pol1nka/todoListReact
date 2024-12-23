import React from 'react';
import styled from "styled-components";

const SortButtonsContainer = styled.div`
    max-width: 100%;
    margin-top: 15px;
    min-height: 45px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.2);
`;

const SortButton = styled.button`
    width: 140px;
    height: 35px;
    background-color: #efeeee;
    box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.1);
    font-family: Inter, sans-serif;
    font-size: 14px;
    padding: 5px;
    color: #323131;
    border-radius: 8px;
    &:hover{
        background-color: #e4e4e4;
        transition: all 0.15s ease;
    }
`;


export const SortButtons = ({ onSortAsc, onSortDesc }) => {
    return (
        <SortButtonsContainer>
            <SortButton onClick={onSortAsc}>По возрастанию</SortButton>
            <SortButton onClick={onSortDesc}>По убыванию</SortButton>
        </SortButtonsContainer>
    );
};