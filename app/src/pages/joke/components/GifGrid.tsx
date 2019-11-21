import React, { useContext, useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ThemeContext } from "../../../contexts/ThemeContext";

const unfoldAnimation = keyframes`
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0);
    }
`;

const GifExpand = styled.details`
    background-color: ${props => props.theme.accent1};
    color: ${props => props.theme.titleFont};
    
    font-size: 1rem;
    cursor: pointer;

    overflow: hidden;
    position: relative;
    z-index: 1; 

    &[open] {
        div {
            animation: ${unfoldAnimation} 1.5s;
        }
    }

    summary {
        background-color: ${props => props.theme.accent1};

        padding: 2rem;
        position: relative;
        z-index: 2; 

        :hover {
            background-color: ${props => props.theme.accent1Hover};
        }
    }

    @media all and (min-width: 800px) {
        font-size: 2rem;
    }
`;

const GifWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Gif = styled.img`
    display: inline-block;
    width: 50%;

    @media all and (min-width: 800px) {
        width: 25%;
    }
`;

export type GifGridProps = {
    jokeId: string
}

export const GifGrid: React.FC<GifGridProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const [gifs, setGifs] = useState<string[]>([]);

    useEffect(() => {
        try {
            fetch("/api/v1/joke/" + args.jokeId + "/gif", {
                method: "GET"
            }).then(x => x.json()).then(x => {
                try {
                    const gifs = x.data.map((data: {keyword: string, gif: string}) => data.gif);
                    setGifs(gifs);
                } catch (e) {
                    console.error("Error processing response from api: " + e);
                }
            })
        } catch (e) {
            console.error(e);
        }
    }, [args.jokeId]);
    
    return (
        <GifExpand theme={theme}>
            <summary>Related Gifs</summary>
            <GifWrapper>{
            gifs.map(gif => {
                return <Gif src={gif} />
            })
            }</GifWrapper>
        </GifExpand>
    );
}