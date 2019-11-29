import React, { useState } from "react";
import { Theme } from "../types/Theme";
import { Dark } from "../themes/Dark.theme";
import { Light } from "../themes/Light.theme";

export type ThemeContextProps = {
    darkMode: boolean,
    theme: Theme,
    setDarkmode: (darkMode: boolean) => void
}

export const ThemeContext = React.createContext<ThemeContextProps>({
    darkMode: true,
    theme: Dark,
    setDarkmode: (darkMode: boolean) => {}
});

export const ThemeContextProvider: React.FC = (args) => {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const [theme, setTheme] = useState<Theme>(Dark);

    const switchTheme = (darkMode: boolean) => {
        setDarkMode(darkMode);
        setTheme(darkMode ? Dark : Light);
    }

    return (
        <ThemeContext.Provider value={{ 
            darkMode: darkMode, theme: theme, setDarkmode: switchTheme 
        }}>
            {args.children}
        </ThemeContext.Provider>
    );
}