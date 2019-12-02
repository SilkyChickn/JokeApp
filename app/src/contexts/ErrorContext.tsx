import React, { useState } from "react";
import { Error } from "../types/Error";

export type ErrorContextProps = {
    error: Error | null,
    setError: (error: Error | null) => void,
    closeError: () => void
}

export const ErrorContext = React.createContext<ErrorContextProps>({
    error: null,
    closeError: () => {},
    setError: () => {}
});

export const ErrorContextProvider: React.FC = (args) => {
    const [error, setError] = useState<Error | null>(null);
    
    return (
        <ErrorContext.Provider value={{ 
            error: error, 
            setError: setError,
            closeError: () => setError(null)
        }}>
            {args.children}
        </ErrorContext.Provider>
    );
}