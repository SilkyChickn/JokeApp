import React from "react";
import styled from "styled-components";
import { Error } from "../../../types/Error";

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

export type ErrorBannerProps = {
    error: Error | null,
    closeError: () => void
}

export const ErrorBanner: React.FC<ErrorBannerProps> = (args) => {
    if(args.error === null) return <></>

    return (
        <ErrorWrapper>
            <div style={{ flex: 1 }}>
            { args.error.code + ": " + args.error.text }
            </div> 
        <CloseError onClick={args.closeError}>Close</CloseError>
        </ErrorWrapper>
    );
}