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
import { Toolbar } from "./components/Toolbar";

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

export const DashboardPage: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    const [minFunniness, setMinFunniness] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>("Funniness");
    const {data, error, loading} = useFetch<Joke[]>
        ("/api/v1/joke/?minFunniness=" + minFunniness + "&sortBy=" + sortBy);
    
    if(error) return <ErrorContainer error={error} />
    if(data === null || loading) return <LoadingContainer />
    
    return (
        <>
            <Background />
            <DashboardWrapper theme={theme}>
                <Toolbar 
                    sortBy={sortBy} 
                    setSortBy={setSortBy} 
                    minFunniness={minFunniness} 
                    setMinFunniness={setMinFunniness}
                />
                <JokeList>{
                    data.map(joke => {
                        return <JokeItem joke={joke} />
                    })
                }</JokeList>
            </DashboardWrapper>
        </>
    );
}