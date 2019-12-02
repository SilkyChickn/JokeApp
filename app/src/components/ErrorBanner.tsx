import React, { useContext } from "react";
import styled from "styled-components";
import { ErrorContext } from "../contexts/ErrorContext";
import { ThemeContext } from "../contexts/ThemeContext";

const ErrorWrapper = styled.div`
    background-color: ${props => props.theme.errorBackground};
    color: ${props => props.theme.errorFont};
    position: fixed;
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: .25rem;
    padding: .5rem;
    z-index: 10;
`;

const CloseError = styled.a`
    background-color: ${props => props.theme.errorCloseButtonBackground};
    color: ${props => props.theme.errorCloseButtonFont};
    border-radius: .25rem;
    padding: .2rem;
    font-size: .5rem;
    cursor: pointer;
    margin-left: .5rem;
    
    :hover {
        background-color: ${props => props.theme.errorCloseButtonBackgroundHover};
    }
`;

/**Showing the errors from the error context
 */
export const ErrorBanner: React.FC = (args) => {
    const { error, closeError } = useContext(ErrorContext);
    const { theme } = useContext(ThemeContext);

    //Return nothing if no error exist
    if(error === null) return <></>

    return (
        <ErrorWrapper theme={theme}>
            <div style={{ flex: 1 }}>
            { error.code + ": " + error.text }
            </div> 
            <CloseError theme={theme} onClick={closeError}>Close</CloseError>
        </ErrorWrapper>
    );
}