import React from 'react';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { JokePage } from './pages/joke/JokePage';
import { PostJokePage } from './pages/createJoke/PostJokePage';
import { ThemeSwitch } from './components/ThemeSwitch';
import { PatchJokePage } from './pages/patchJoke/PatchJokePage';
import { ErrorContextProvider } from './contexts/ErrorContext';
import { ErrorBanner } from './components/ErrorBanner';
import { Background } from './components/Background';

const App: React.FC = () => {
    return (
        <Router>
            <ThemeContextProvider>
                <ErrorContextProvider>
                    <ThemeSwitch />
                    <ErrorBanner />
                    <Background />
                    <Switch>
                        <Route path="/joke/:id/edit">{(props) => {
                            return <PatchJokePage routerProps={props} />
                        }}</Route>
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
                </ErrorContextProvider>
            </ThemeContextProvider>
        </Router>
    );
}

export default App;