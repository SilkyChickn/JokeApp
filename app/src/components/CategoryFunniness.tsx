import React from "react";
import styled from "styled-components";
import { CategoryList, CategoryItem } from "./CategoryItem";
import { FunninessController } from "./FunninessController";
import { Joke } from "../types/Joke";
import { Category } from "../types/Category";

const CategoryFunninessWrapper = styled.div`
    display: flex;
    align-items: baseline;
    padding: 0;
    
    @media all and (min-width: 800px) {
        div {
            font-size: 2.5rem;
        }
    }
`;

export type CategoryFunninessProps = {
    joke: Joke
}

export const CategoryFunniness: React.FC<CategoryFunninessProps> = (args) => {
    return (
        <CategoryFunninessWrapper>
            <CategoryList>{
                args.joke.categories.map((cat: Category) => {
                    return <CategoryItem key={cat.id} category={cat} />
                })
            }</CategoryList>
            <FunninessController joke={args.joke} />
        </CategoryFunninessWrapper>
    );
}