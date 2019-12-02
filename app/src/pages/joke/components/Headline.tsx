import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Redirect } from "react-router";

const HeadLine = styled.div`
    border-bottom: 1px solid ${props => props.theme.accent3};
    background-color: ${props => props.theme.accent1};

    display: flex;
    
    padding: 2rem;

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

const BackButton = styled.a`
    color: ${props => props.theme.accent3};

    cursor: pointer;
    text-decoration: none;

    margin-right: 2rem;
    margin-left: 1rem;

    @media all and (min-width: 800px) {
        margin-right: 4rem;
        margin-left: 2rem;
    }

    :hover {
        color: ${props => props.theme.accent3Hover};
    }
`;

export type HeadlineProps = {
    title: string;
}

export const Headline: React.FC<HeadlineProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    
    const [toDashboard, setToDashboard] = useState<boolean>(false);

    return (
        <>
            {toDashboard ? <Redirect to="/" /> : null}
            <HeadLine theme={theme}>
                <BackButton onClick={() => setToDashboard(true)} theme={theme}>&#171;</BackButton>
                <Title>{args.title}</Title>
            </HeadLine>
        </>
    );
}