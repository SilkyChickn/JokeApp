import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Redirect } from "react-router";

const ToolbarWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: right;
    margin: 1rem;
`;

const FilterBox = styled.select`
    color: ${props => props.theme.textFont};
    background-color: ${props => props.theme.accent1};
    border: 0;
    outline: none;
    height: 2rem;
`;

const FunninessSlider = styled.input`
    color: ${props => props.theme.textFont};
    background-color: ${props => props.theme.accent1};
    max-width: 2.75rem;
    border: 0;
    outline: none;
    padding: .25rem;
    padding-right: 0;
`;

export type ToolbarProps = {
    minFunniness: number,
    setMinFunniness: (minFunniness: number) => void,
    sortBy: string,
    setSortBy: (sortBy: string) => void
}

export const Toolbar: React.FC<ToolbarProps> = (args) => {
    const { theme } = useContext(ThemeContext);

    const [toPostPage, setToPostPage] = useState<boolean>(false);

    const downloadJokes = () => {
        alert("Not implemented yet :/");
    }

    return (
        <>
            {toPostPage ? <Redirect to="/create" /> : null}
            <ToolbarWrapper>
                <Button 
                    style={{width: "2rem", height:"2rem"}} 
                    theme={theme} onClick={() => setToPostPage(true)}
                >+</Button>
                <div style={{width: "1rem"}} />
                <Button
                    onClick={downloadJokes}
                    style={{width: "2rem", height:"2rem"}} theme={theme}
                >&#10515;</Button>
                <div style={{width: "1rem"}} />
                <span style={{
                    textAlign: "center", 
                    paddingTop: ".25rem", 
                    width: "2rem", height: "2rem", 
                    color: theme.textFont, 
                    backgroundColor: theme.accent1
                }}>↓≡</span>
                <FilterBox value={args.sortBy} onChange={(e) => args.setSortBy(e.target.value)} theme={theme}>
                    <option>Funniness</option>
                    <option>Author</option>
                    <option>Title</option>
                </FilterBox>
                <div style={{width: "1rem"}} />
                <div style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <span style={{fontSize:".5rem", paddingBottom: ".1rem"}}>Min Funniness</span>
                    <FunninessSlider min={0} value={args.minFunniness} onChange={(e) => args.setMinFunniness(e.target.valueAsNumber)} theme={theme} type={"number"} />
                </div>
            </ToolbarWrapper>
        </>
    );
}