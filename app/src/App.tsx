import React from 'react';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { JokePage } from './pages/joke/JokePage';
import { PostJokePage } from './pages/createJoke/PostJokePage';
import { ThemeSwitch } from './components/ThemeSwitch';

const App: React.FC = () => {
    return (
        <Router>
            <ThemeContextProvider>
                <ThemeSwitch />
                <Switch>
                    <Route path="/joke/:id">{(props) => {
                        return <JokePage routerProps={props} />
                    }}</Route>
                    <Route path="/create">
                        <PostJokePage />
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