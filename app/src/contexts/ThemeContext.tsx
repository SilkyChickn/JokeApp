import React, { useState } from "react";
import { Theme } from "../types/Theme";
import { Dark } from "../themes/Dark.theme";

export type ThemeContextProps = {
    theme: Theme | null,
    setTheme: (theme: Theme) => void
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    theme: null,
    setTheme: (theme: Theme) => {}
});

export const ThemeContextProvider: React.FC = (args) => {
    const [theme, setTheme] = useState<Theme>(Dark);

    return (
        <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
            {args.children}
        </ThemeContext.Provider>
    );
}