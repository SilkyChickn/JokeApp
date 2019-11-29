import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Background } from "./Background";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button } from "./Button";
import { Redirect } from "react-router";

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
    const [toDashboard, setToDashboard] = useState<boolean>(false);
    
    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            {toDashboard ? <Redirect to="/"/> : null}
            <Background />
            <LoadingText theme={theme}>Loading...</LoadingText>
            <Button style={{alignSelf: "center", margin: "3rem"}} theme={theme} onClick={() => setToDashboard(true)}>Back to dashboard</Button>
        </div>
    );
}