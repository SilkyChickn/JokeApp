import React, { useContext } from "react";
import styled from "styled-components";
import { Joke } from "../../types/Joke";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CategoryFunniness } from "../../components/CategoryFunniness";
import { AuthorSignature } from "../../components/AuthorSignature";
import { GifGrid } from "./components/GifGrid";

const HeadLine = styled.div`
    border-bottom: 1px solid ${props => props.theme.accent3};
    background-color: ${props => props.theme.accent1};

    display: flex;
    
    padding: 2rem;

    font-size: 1.5rem;

    @media all and (min-width: 700px) {
        font-size: 3rem;
    }
`;

const Title = styled.p`
    margin: 0;
    word-wrap: break-word;
    word-break: break-all;
`;

const BackButton = styled.a`
    color: ${props => props.theme.buttonFont};

    cursor: pointer;

    margin-right: 2rem;
    margin-left: 1rem;

    @media all and (min-width: 700px) {
        margin-right: 4rem;
        margin-left: 2rem;
    }

    :hover {
        color: ${props => props.theme.buttonFontHover};
    }
`;

export const Text = styled.p`
    color: ${props => props.theme.textFont};
    text-align: center;
    white-space: pre-wrap;
    padding: 3rem;
    margin: 0;
    padding-bottom: 0;
    font-size: 1rem;

    @media all and (min-width: 700px) {
        font-size: 2rem;
        padding: 4rem;
        padding-bottom: 0;
    }
`;

export const Created = styled.p`
    color: ${props => props.theme.accent3};
    margin: 0;
    margin-bottom: 2rem;
    padding-left: 3.5rem;
`;

export type JokePageProps = {
    joke: Joke;
}

const testGifs: string[] = [
    "https://media.giphy.com/media/Ihh7DeGZXP8wMxmGF1/giphy.gif",
    "https://media.giphy.com/media/Ihh7DeGZXP8wMxmGF1/giphy.gif",
    "https://media.giphy.com/media/Ihh7DeGZXP8wMxmGF1/giphy.gif",
    "https://media.giphy.com/media/Ihh7DeGZXP8wMxmGF1/giphy.gif",
    "https://media.giphy.com/media/Ihh7DeGZXP8wMxmGF1/giphy.gif",
    "https://media.giphy.com/media/Ihh7DeGZXP8wMxmGF1/giphy.gif"
];

export const JokePage: React.FC<JokePageProps> = (args) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div>
            <HeadLine theme={theme}>
                <BackButton theme={theme}>&#171;</BackButton>
                <Title theme={theme}>{args.joke.title}</Title>
            </HeadLine>
            <Text>{args.joke.text}</Text>
            <CategoryFunniness funniness={args.joke.funniness} categories={args.joke.categories} />
            <Created theme={theme}>Created: {args.joke.createdAt}</Created>
            <AuthorSignature author={args.joke.author} />
            <GifGrid gifs={testGifs} />
        </div>
    );
}