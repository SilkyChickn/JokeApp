import React, { useContext, useState, useEffect } from "react";
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

export const Timestamp = styled.p`
    color: ${props => props.theme.accent3};
    margin: 0;
    margin-bottom: 2rem;
    padding-left: 0rem;
    margin-left: 1.7rem;
`;

const emptyJoke: Joke = {
    id: "",
    title: "",
    text: "",
    funniness: 0,
    author: {},
    categories: [],
    createdAt: "",
    updatedAt: ""
}

export type JokePageProps = {
    routerProps: any
}

export const JokePage: React.FC<JokePageProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const [joke, setJoke] = useState<Joke>(emptyJoke);

    useEffect(() => {
        try {
            fetch("/api/v1/joke/" + args.routerProps.match.params.id, {
                method: "GET"
            }).then(x => x.json()).then(x => {
                try {
                    const joke = x.data as Joke;
                    if(joke === undefined) throw "Joke not found!";
                    setJoke(joke);
                } catch (e) {
                    console.error("Error processing response from api: " + e);
                }
            })
        } catch (e) {
            console.error(e);
        }
    }, [args]);
    
    return (
        <div>
            <Headline title={joke.title} />
            <Text>{joke.text}</Text>
            <CategoryFunniness joke={joke} />
            <Timestamp theme={theme}>Created: {joke.createdAt}<br />Updated: {joke.updatedAt}</Timestamp>
            <AuthorSignature author={joke.author} />
            <GifGrid jokeId={joke.id} />
        </div>
    );
}
