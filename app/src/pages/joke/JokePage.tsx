import React, { useContext } from "react";
import styled from "styled-components";
import { Joke } from "../../types/Joke";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CategoryFunniness } from "../../components/CategoryFunniness";
import { AuthorSignature } from "../../components/AuthorSignature";
import { GifGrid } from "./components/GifGrid";
import { Headline } from "./components/Headline";

export const Text = styled.p`
    color: ${props => props.theme.textFont};
    text-align: center;
    white-space: pre-wrap;
    padding: 3rem;
    margin: 0;
    padding-bottom: 0;
    font-size: 1rem;

    @media all and (min-width: 800px) {
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
            <Headline title={args.joke.title} />
            <Text>{args.joke.text}</Text>
            <CategoryFunniness funniness={args.joke.funniness} categories={args.joke.categories} />
            <Created theme={theme}>Created: {args.joke.createdAt}</Created>
            <AuthorSignature author={args.joke.author} />
            <GifGrid gifs={testGifs} />
        </div>
    );
}