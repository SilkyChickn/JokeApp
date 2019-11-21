import React from 'react';
import './App.css';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { JokePage } from './pages/joke/JokePage';
import { Joke } from './types/Joke';

const testJoke: Joke = {
    id: "6e532b21-cd8c-4028-b425-1690c873b56e",
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
    createdAt: "yesterday",
    updatedAt: "today"
}

const App: React.FC = () => {
    return (
        <Router>
            <ThemeContextProvider>
                <Switch>
                    <Route path="/joke/:id">{(props) => {
                        return <JokePage routerProps={props} />
                    }}</Route>
                    <Route path="/create">
                        
                    </Route>
                    <Route path="/">
                        <DashboardPage />
                    </Route>
                </Switch>
            </ThemeContextProvider>
        </Router>
    );
}

export default App;