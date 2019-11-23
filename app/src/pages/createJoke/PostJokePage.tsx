import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SelectAuthor } from "./components/SelectAuthor";

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2rem;
    font-size: 1rem;
`;

export const Input = styled.input`
    color: ${props => props.theme.textFont};
    background-color: ${props => props.theme.accent2};
    
    font-size: 1rem;
    padding: .5rem;
    margin-bottom: 2rem;
    
    border: 2px solid ${props => props.theme.accent1};
    border-radius: .5rem;
    
    :focus {
        outline: 0;
    }

    @media all and (min-width: 800px) {
        font-size: 1.5rem;
        padding: 1rem;
    }
`;

export const TextArea = styled.textarea`
    color: ${props => props.theme.textFont};
    background-color: ${props => props.theme.accent2};

    font-size: 1rem;
    padding: .5rem;
    min-width: 100%;
    max-width: 100%;
    margin-bottom: 2rem;
    height: 10rem;
    
    border: 2px solid ${props => props.theme.accent1};
    border-radius: .5rem;
    
    :focus {
        outline: 0;
    }

    @media all and (min-width: 800px) {
        font-size: 1.5rem;
        padding: 1rem;
        height: 20rem;
    }
`;

export const Button = styled.button`
    color: ${props => props.theme.buttonFont};
    background-color: ${props => props.theme.likeHover};

    justify-self: right;
    font-size: 1rem;

    border: 0;
    border-radius: .5rem;
    margin-left: .5rem;
    padding: .5rem;
    max-width: 10rem;

    :focus {
        outline: 0;
    }
    :hover {
        color: ${props => props.theme.buttonFont};
        background-color: ${props => props.theme.likeClicked};
    }
`;

export const Seperator = styled.div`
    background-color: ${props => props.theme.accent3};
    height: .2rem;
    width: 100%;
    margin-bottom: 2rem;
`;

export const PostJokePage: React.FC = () => {
    const { theme } = useContext(ThemeContext);

    const cancel = () => {
        window.location.href = "/";
    }

    const post = () => {
        alert("Not implemented yet :/");
    }

    return (
        <Form onSubmit={post} theme={theme}>
            <Input theme={theme} placeholder={"Title"} />
            <TextArea theme={theme} placeholder={"Joke..."} />
            <Seperator theme={theme} />
            <SelectAuthor />
            <Seperator theme={theme} />
            <div style={{display: "flex", justifyContent: "flex-end", alignItems: "baseline"}}>
                <label style={{marginRight: "2rem"}}>
                    <Input theme={theme} type={"checkbox"} />
                    <span>{"Visible on dashboard"}</span>
                </label>
                <Button type="button" onClick={cancel} theme={theme}>Cancel</Button>
                <Button type="submit" theme={theme}>Post Joke</Button>
            </div>
        </Form>
    );
}