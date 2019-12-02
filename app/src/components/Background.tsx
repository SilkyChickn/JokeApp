import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

const BackgroundDiv = styled.div`
    background-color: ${props => props.theme.background};
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
`;

export const Background = () => {
    const { theme } = useContext(ThemeContext);
    
    return <BackgroundDiv theme={theme} />
}