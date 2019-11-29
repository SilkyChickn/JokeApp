import React, { useContext, useState } from "react";
import { JokeList, JokeItem } from "./components/JokeItem";
import { Joke } from "../../types/Joke";
import { useFetch } from "../../hooks/UseFetch";
import { ErrorContainer } from "../../components/ErrorContainer";
import { LoadingContainer } from "../../components/LoadingContainer";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components";
import { Background } from "../../components/Background";
import { Redirect } from "react-router";
import { Button } from "../../components/Button";

export const DashboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${props => props.theme.textFont};

    @media all and (min-width: 800px) {
        align-items: flex-start;

        margin-left: 15%;
        margin-right: 15%;
        margin-bottom: 3rem;
    }
`;

//TODO Delete button for jokes
//TODO Sort button
//TODO Patch button
export const DashboardPage: React.FC = () => {
    const {data, error, loading} = useFetch<Joke[]>("/api/v1/joke/");
    const { theme } = useContext(ThemeContext);

    const [toPostPage, setToPostPage] = useState<boolean>(false);

    if(error) return <ErrorContainer error={error} />
    if(data === null || loading) return <LoadingContainer />
    
    return (
        <>
        {toPostPage ? <Redirect to="/create" /> : null}
        <Background />
        <DashboardWrapper theme={theme}>
            <Button 
                onClick={() => setToPostPage(true)} 
                style={{margin: "2rem"}} theme={theme}>
                Post new Joke
            </Button>
            <JokeList>{
                data.map(joke => {
                    return <JokeItem joke={joke} />
                })
            }</JokeList>
        </DashboardWrapper>
        </>
    );
}