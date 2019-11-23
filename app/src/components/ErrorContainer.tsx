import React from "react";
import styled from "styled-components";
import { Error } from "../types/Error";

const ErrorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
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
    return (
        <ErrorWrapper>
            <ErrorTitle>Oops!</ErrorTitle>
            <ErrorCode>{args.error.code}</ErrorCode>
            <ErrorText>{args.error.text}</ErrorText>
        </ErrorWrapper>
    );
}