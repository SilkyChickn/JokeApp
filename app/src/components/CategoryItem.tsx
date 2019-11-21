import React, { useContext } from "react";
import styled from "styled-components";
import { Category } from "../types/Category";
import { ThemeContext } from "../contexts/ThemeContext";

export const CategoryList = styled.ul`
    list-style: none;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex: 2;
    
    padding: 0;
    margin: 1.5rem;
`;

const ListItem = styled.li`
    color: ${props => props.theme.categoryFont};
    background-color: ${props => props.theme.categoryBackground};
    
    font-size: 0.75rem;

    padding: 0.25rem;
    margin: 0.2rem;
    border-radius: 0.5rem;
`;

export type CategoryItemProps = {
    category: Category
}

export const CategoryItem: React.FC<CategoryItemProps> = (args) => {
    const { theme } = useContext(ThemeContext);

    return <ListItem theme={theme}>{args.category.title}</ListItem>;
}