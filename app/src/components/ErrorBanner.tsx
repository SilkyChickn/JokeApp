import React, { useContext } from "react";
import styled from "styled-components";
import { ErrorContext } from "../contexts/ErrorContext";

const ErrorWrapper = styled.div`
    background-color: rgb(256, 90, 90);
    color: rgb(256, 200, 200);
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: .25rem;
    margin: 2rem;
    padding: .5rem;
`;

const CloseError = styled.a`
    background-color: rgb(256, 128, 128);
    color: rgb(256, 50, 50);
    border-radius: .25rem;
    padding: .2rem;
    font-size: .5rem;
    cursor: pointer;
    
    :hover {
        background-color: rgb(256, 100, 100);
    }
`;

export const ErrorBanner: React.FC = (args) => {
    const { error, closeError } = useContext(ErrorContext);

    if(error === null) return <></>

    return (
        <ErrorWrapper>
            <div style={{ flex: 1 }}>
            { error.code + ": " + error.text }
            </div> 
            <CloseError onClick={closeError}>Close</CloseError>
        </ErrorWrapper>
    );
}