import React, { useEffect, useState } from "react";
import { JokeList, JokeItem } from "./components/JokeItem";
import { Joke } from "../../types/Joke";

export const DashboardPage: React.FC = () => {
    const [jokes, setJokes] = useState<Joke[]>([]);

    useEffect(() => {
        try {
            fetch("/api/v1/joke", {
                method: "GET"
            }).then(x => x.json()).then(x => {
                const jokes = x.data as Joke[];
                setJokes(jokes);
            })
        } catch (e) {
            console.error(e);
        }
    }, []);
    
    return (
        <JokeList>{
            jokes.map(joke => {
                return <JokeItem joke={joke} />
            })
        }</JokeList>
    );
}