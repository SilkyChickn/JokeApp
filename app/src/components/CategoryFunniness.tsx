import React from "react";
import styled from "styled-components";
import { CategoryList, CategoryItem } from "./CategoryItem";
import { FunninessController } from "./FunninessController";
import { Category } from "../types/Category";

const CategoryFunninessWrapper = styled.div`
    display: flex;
    align-items: baseline;
    padding: 2rem;
    
    @media all and (min-width: 800px) {
        div {
            font-size: 2.5rem;
        }
    }
`;

export type CategoryFunninessProps = {
    categories: Category[],
    funniness: number
}

export const CategoryFunniness: React.FC<CategoryFunninessProps> = (args) => {
    return (
        <CategoryFunninessWrapper>
            <CategoryList>{
                args.categories.map(cat => {
                    return <CategoryItem category={cat} />
                })
            }</CategoryList>
            <FunninessController funniness={args.funniness} />
        </CategoryFunninessWrapper>
    );
}