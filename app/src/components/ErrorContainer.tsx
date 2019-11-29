import React, { useContext } from "react";
import styled from "styled-components";
import { Error } from "../types/Error";
import { ThemeContext } from "../contexts/ThemeContext";
import { Background } from "./Background";

const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color: ${props => props.theme.textFont};
`;

const ErrorTitle = styled.p`
    font-size: 5rem;

    @media all and (min-width: 800px) {
        font-size: 10rem;
    }
`;

const ErrorCode = styled.p`
    font-size: 2.5rem;
    margin: 1rem;

    @media all and (min-width: 800px) {
        font-size: 5rem;
    }
`;

const ErrorText = styled.p`
    font-size: 1rem;
    margin: 0;

    @media all and (min-width: 800px) {
        font-size: 2rem;
    }
`;

export type ErrorComponentProps = {
    error: Error
}

export const ErrorContainer: React.FC<ErrorComponentProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <>
        <Background />
        <ErrorWrapper theme={theme}>
            <ErrorTitle>Oops!</ErrorTitle>
            <ErrorCode>{args.error.code}</ErrorCode>
            <ErrorText>{args.error.text}</ErrorText>
        </ErrorWrapper>
        </>
    );
}