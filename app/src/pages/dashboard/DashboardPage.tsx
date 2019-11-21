import React from "react";
import { JokeList, JokeItem } from "./components/JokeItem";
import { Joke } from "../../types/Joke";

const testJoke: Joke = {
	title: "Wordplay",
	text: "What word in the English language does the following: the first two letters signify a male, the first three letters signify a female, the first four letters signify a great, while the entire world signifies a great woman. What is the word?\n\nThis is hard because it gets you thinking about gender and the ways they’re different. You have to think of one word that holds the others. It’s easy when you think about it!\n\nAnswer: Heroine",
    funniness: 5,
    author: {
        name: "Catlover24",
        signature: "My jokes are the best!"
    },
    categories: [
        {title: "Dark Jokes"},
        {title: "Bad Jokes"}
    ],
    createdAt: "today"
}

export const DashboardPage: React.FC = () => {
    return (
        <JokeList>
            <JokeItem joke={testJoke} />
            <JokeItem joke={testJoke} />
            <JokeItem joke={testJoke} />
            <JokeItem joke={testJoke} />
        </JokeList>
    );
}