import React, { useContext } from "react";
import { JokeList, JokeItem } from "./components/JokeItem";
import { Joke } from "../../types/Joke";
import { useFetch } from "../../hooks/UseFetch";
import { ErrorContainer } from "../../components/ErrorContainer";
import { LoadingContainer } from "../../components/LoadingContainer";
import { Button } from "../createJoke/PostJokePage";
import { ThemeContext } from "../../contexts/ThemeContext";
import styled from "styled-components";

export const DashboardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media all and (min-width: 800px) {
        align-items: flex-start;

        margin-left: 15%;
        margin-right: 15%;
        margin-bottom: 3rem;
    }
`;

//TODO Delete button for jokes
export const DashboardPage: React.FC = () => {
    const {data, error, loading} = useFetch<Joke[]>("/api/v1/joke");
    const { theme } = useContext(ThemeContext);
    
    if(error) return <ErrorContainer error={error} />
    if(data === null || loading) return <LoadingContainer />
    
    return (
        <DashboardWrapper>
            <Button 
                onClick={() => window.location.href="/create"} 
                style={{margin: "2rem"}} theme={theme}>
                Post new Joke
            </Button>
            <JokeList>{
                data.map(joke => {
                    return <JokeItem joke={joke} />
                })
            }</JokeList>
        </DashboardWrapper>
    );
}