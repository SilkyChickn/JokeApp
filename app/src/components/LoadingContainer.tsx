import React, { useContext } from "react";
import styled from "styled-components";
import { Background } from "./Background";
import { ThemeContext } from "../contexts/ThemeContext";

const LoadingText = styled.p`
    text-align: center;
    margin-top: 5rem;
    font-size: 1rem;
    color: ${props => props.theme.textFont};

    @media all and (min-width: 800px) {
        font-size: 2rem;
    }
`;

export const LoadingContainer: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Background />
            <LoadingText theme={theme}>Loading...</LoadingText>
        </>
    );
}