import React, { useContext, useState } from "react";
import { Joke } from "../../../types/Joke";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styled from "styled-components";
import { CategoryFunniness } from "../../../components/CategoryFunniness";
import { AuthorSignature } from "../../../components/AuthorSignature";
import { Redirect } from "react-router";

export const JokeList = styled.ul`
    display: flex;
    list-style: none;
    flex-direction: column;
    width: 100%;
    
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
    font-size: 1.25rem;

    margin: 0;
    margin-top: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;

    @media all and (min-width: 800px) {
        font-size: 2rem;
    }
`;

const Text = styled.p`
    font-size: .75rem;
    white-space: pre-wrap;

    margin: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;

    @media all and (min-width: 800px) {
        font-size: 1.25rem;
    }
`;

export type JokeItemProps = {
    joke: Joke
}

export const JokeItem: React.FC<JokeItemProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const [toJoke, setToJoke] = useState<boolean>(false);

    return (
        <>
            {toJoke ? <Redirect to={"/joke/" + args.joke.id} /> : null}
            <ListItem theme={theme}>
                <Header onClick={() => setToJoke(true)}>{args.joke.title}</Header>
                <Text onClick={() => setToJoke(true)}>{args.joke.text}</Text>
                <CategoryFunniness joke={args.joke} />
                <AuthorSignature author={args.joke.author} />
            </ListItem>
        </>
    );
}