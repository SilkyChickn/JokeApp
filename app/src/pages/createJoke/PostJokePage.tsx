import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SelectAuthor } from "./components/SelectAuthor";
import { JokeCreateData } from "../../types/Joke";
import { Error } from "../../types/Error";
import { ErrorBanner } from "./components/ErrorBanner";

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

    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(true);

    const [error, setError] = useState<Error | null>(null);

    const cancel = () => {
        window.location.href = "/";
    }

    const post = () => {
        
        const createData: JokeCreateData = {
            title: title,
            text: text,
            visibility: visible ? "visible" : "hidden",
            authorId: "e6eb2ccd-24dd-48b8-8bb7-8c17de4ae756"
        }

        fetch("/api/v1/joke/", {
            method: "POST",headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createData)
        }).then(async res => {
            if(res.status === 500){
                setError({code: res.status, text: res.statusText});
                throw res.status + ":" + res.statusText;
            }else if(!res.ok){
                const data = await res.json();
                if(data.error !== undefined) setError({ code: res.status, text: data.error });
                else setError({ code: res.status, text: data.status });
                throw res.status + ":" + data.status;
            }
            return res.json();
        }).then(() => {
            closeError();
            cancel();
        });
    }

    const closeError = () => {
        setError(null);
    }

    return (
        <>
            <ErrorBanner error={error} closeError={closeError} />
            <Form theme={theme}>
                <Input value={title} onChange={event => setTitle(event.target.value)} theme={theme} placeholder={"Title"} />
                <TextArea value={text} onChange={event => setText(event.target.value)} theme={theme} placeholder={"Joke..."} />
                <Seperator theme={theme} />
                <SelectAuthor />
                <Seperator theme={theme} />
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "baseline"}}>
                    <label style={{marginRight: "2rem"}}>
                        <Input checked={visible} onChange={event => setVisible(event.target.checked)} theme={theme} type={"checkbox"} />
                        <span>{"Visible on dashboard"}</span>
                    </label>
                    <Button type="button" onClick={cancel} theme={theme}>Cancel</Button>
                    <div style={{width:"1rem"}} />
                    <Button type="button" onClick={post} theme={theme}>Post Joke</Button>
                </div>
            </Form>
        </>
    );
}