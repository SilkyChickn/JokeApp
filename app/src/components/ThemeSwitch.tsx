import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

const Label = styled.p`
    color: ${props => props.theme.textFont};
    margin: .5rem;
    margin-left: auto;
`;

type SwitchProps = {
    checked: boolean
}

const Switch = styled.div<SwitchProps>`
    margin-right: 1rem;
    width: 2.25rem;
    height: 1.5rem;
    background-color: ${props => props.checked ? "#2196F3" : "white"};
    border-radius: 2rem;
    border: 1px solid #ccc;
`;

type SliderProps = {
    checked: boolean
}

const Slider = styled.div<SliderProps>`
    cursor: pointer;
    background-color: #ccc;
    transition: .4s;
    width: 1.15rem;
    height: 1.15rem;
    margin-top: .1rem;
    border-radius: 2rem;
    transform: ${props => props.checked ? "translateX(.9rem)" : "translateX(.1rem)"};
`;

/**Changes theme in theme context
 */
export const ThemeSwitch: React.FC = () => {
    const { theme, darkMode, setDarkmode } = useContext(ThemeContext);

    const switchTheme = () => {
        setDarkmode(!darkMode);
    }
    
    return (
        <>
            <Label theme={theme}>Darkmode</Label>
            <Switch checked={darkMode}>
                <Slider checked={darkMode} onClick={switchTheme}></Slider>
            </Switch>
        </>
    );
}