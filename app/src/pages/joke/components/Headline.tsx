import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";

const HeadLine = styled.div`
    border-bottom: 1px solid ${props => props.theme.accent3};
    background-color: ${props => props.theme.accent1};

    display: flex;
    
    padding: 2rem;
    padding-top: .5rem;

    font-size: 1.5rem;

    @media all and (min-width: 800px) {
        font-size: 3rem;
    }
`;

const Title = styled.p`
    margin: 0;
    word-wrap: break-word;
    word-break: break-all;
`;

export type HeadlineProps = {
    title: string;
}

export const Headline: React.FC<HeadlineProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <>
            <HeadLine theme={theme}>
                <Title>{args.title}</Title>
            </HeadLine>
        </>
    );
}