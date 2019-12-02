import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

const SwitchContainer = styled.div`
    background-color: ${props => props.theme.background};
    position: fixed;
    width: 6.5rem;
    height: 5.5rem;
    bottom: 0;
    right: 0;
    z-index: 5;
    border-radius: 1rem;
    opacity: .5;

    @media all and (min-width: 800px){
        top: 0;
    }
`;

const Label = styled.p`
    color: ${props => props.theme.textFont};
    position: absolute;
    margin: 0;
    top: 1rem;
    right: 1rem;
`;

type SwitchProps = {
    checked: boolean
}

const Switch = styled.div<SwitchProps>`
    position: absolute;
    width: 3.25rem;
    height: 2rem;
    background-color: ${props => props.checked ? "#2196F3" : "white"};
    top: 2.75rem;
    right: 1.7rem;
    border-radius: 2rem;
    border: 1px solid #ccc;
`;

type SliderProps = {
    checked: boolean
}

const Slider = styled.div<SliderProps>`
    position: absolute;
    cursor: pointer;
    background-color: #ccc;
    transition: .4s;
    top: .2rem;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 2rem;
    transform: ${props => props.checked ? "translateX(1.5rem)" : "translateX(.25rem)"};
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
            <SwitchContainer theme={theme}>
                <Label theme={theme}>Darkmode</Label>
                <Switch checked={darkMode}>
                    <Slider checked={darkMode} onClick={switchTheme}></Slider>
                </Switch>
            </SwitchContainer>
        </>
    );
}