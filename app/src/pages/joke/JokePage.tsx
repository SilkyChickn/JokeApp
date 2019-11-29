import React, { useContext } from "react";
import styled from "styled-components";
import { Joke } from "../../types/Joke";
import { ThemeContext } from "../../contexts/ThemeContext";
import { CategoryFunniness } from "../../components/CategoryFunniness";
import { AuthorSignature } from "../../components/AuthorSignature";
import { GifGrid } from "./components/GifGrid";
import { Headline } from "./components/Headline";
import { useFetch } from "../../hooks/UseFetch";
import { ErrorContainer } from "../../components/ErrorContainer";
import { LoadingContainer } from "../../components/LoadingContainer";
import { Background } from "../../components/Background";
import { PatchDelete } from "./components/PatchDelete";

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

export type JokePageProps = {
    routerProps: any
}

export const JokePage: React.FC<JokePageProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const { data, loading, error } = useFetch<Joke>("/api/v1/joke/" + args.routerProps.match.params.id);

    if(error) return <ErrorContainer error={error} />
    if(data === null || loading) return <LoadingContainer />
    
    return (
        <div style={{color: theme.textFont}}>
            <Background />
            <Headline title={data.title} />
            <Text>{data.text}</Text>
            <CategoryFunniness joke={data} />
            <Timestamp theme={theme}>
                Created: {data.createdAt.substring(0, 10)}
                <br />
                Updated: {data.updatedAt.substring(0, 10)}
            </Timestamp>
            <PatchDelete joke={data} />
            <AuthorSignature author={data.author} />
            <GifGrid jokeId={data.id} />
        </div>
    );
}
