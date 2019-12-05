import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { ThemeSwitch } from "./ThemeSwitch";
import { Link } from "react-router-dom";

const Banner = styled.div`
    background-color: ${props => props.theme.accent1};
    color: ${props => props.theme.textFont};
    
    display: flex;
    align-items: center;

    font-size: 1rem;

    img{
        width: 3rem;
        height: auto;
        padding: .5rem;
        margin-right: 1rem;
        margin-left: 1rem;
        cursor: pointer;
    }
`;

export const TitleBanner: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Banner theme={theme}>
                <Link to="/"><img alt={"JokeAppIcon"} src={"/android-chrome-512x512.png"} /></Link>
                Joke App
                <ThemeSwitch />
            </Banner>
        </>
    );
}