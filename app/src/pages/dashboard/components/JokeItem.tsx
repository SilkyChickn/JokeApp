import React, { useContext } from "react";
import { Joke } from "../../../types/Joke";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styled from "styled-components";
import { CategoryFunniness } from "../../../components/CategoryFunniness";
import { AuthorSignature } from "../../../components/AuthorSignature";

export const JokeList = styled.ul`
    display: flex;
    list-style: none;
    flex-direction: column;

    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    background-color: ${props => props.theme.accent1};

    text-align: center;

    margin-bottom: 0.3rem;
    overflow: hidden;

    cursor: pointer;

    @media all and (min-width: 800px) {
        margin-left: 15%;
        margin-right: 15%;

        :last-child {
            border-bottom-left-radius: 2rem;
            border-bottom-right-radius: 2rem;
        }

        :first-child {
            border-top-left-radius: 2rem;
            border-top-right-radius: 2rem;
        }
    }

    :hover {
        background-color: ${props => props.theme.accent1Hover};

        .signature {
            background-color: ${props => props.theme.accent2Hover};
        }
    }
`;

const Header = styled.p`
    font-size: 1.5rem;

    margin: 0;
    margin-top: 1.5rem;
`;

const Text = styled.p`
    font-size: 1rem;
    white-space: pre-wrap;

    margin: 1.5rem;

    @media all and (min-width: 800px) {
        font-size: 1.5rem;
    }
`;

export type JokeItemProps = {
    joke: Joke
}

export const JokeItem: React.FC<JokeItemProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <ListItem theme={theme}>
            <Header>{args.joke.title}</Header>
            <Text onClick={(e) => alert("Hello World!")}>{args.joke.text}</Text>
            <CategoryFunniness funniness={args.joke.funniness} categories={args.joke.categories} />
            <AuthorSignature author={args.joke.author} />
        </ListItem>
    );
}