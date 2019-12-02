import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SelectAuthor } from "./components/SelectAuthor";
import { JokeCreateData } from "../../types/Joke";
import { ErrorBanner } from "../../components/ErrorBanner";
import { Author, AuthorCreateData } from "../../types/Author";
import { Background } from "../../components/Background";
import { Redirect } from "react-router";
import { Button } from "../../components/Button";
import { SelectCategories } from "./components/SelectCategories";
import { Category } from "../../types/Category";
import { ErrorContext } from "../../contexts/ErrorContext";

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

export const Seperator = styled.div`
    background-color: ${props => props.theme.accent3};
    height: .2rem;
    width: 100%;
    margin-bottom: 2rem;
    margin-top: 2rem;
`;

export const PostJokePage: React.FC = () => {
    const { theme } = useContext(ThemeContext);
    const { closeError, setError } = useContext(ErrorContext);
    
    const [toDashboard, setToDashboard] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(true);
    const [author, setAuthor] = useState<Author>();
    const [categories, setCategories] = useState<Category[]>([]);

    const [createAuthor, setCreateAuthor] = useState<boolean>(false);
    const [newAuthorName, setNewAuthorName] = useState<string>("");
    const [newAuthorSignature, setNewAuthorSignature] = useState<string>("");

    const cancel = () => {
        setToDashboard(true);
    }

    const throwError = (code: number, message: string) => {
        setError({ code: code, text: message });
        throw Promise.reject(code + ": " + message);
    }

    const postAuthor = async () => {
        if(createAuthor){
            const authorData: AuthorCreateData = {
                name: newAuthorName,
                signature: newAuthorSignature
            }
            
            const res: Response = await fetch("/api/v1/author/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(authorData)
            });

            if(res.status === 500){
                throwError(res.status, res.statusText);
            }else if(!res.ok){
                const data = await res.json();
                if(data.error !== undefined) throwError(res.status, data.error);
                else throwError(res.status, data.status);
            }
            const data: any = await res.json();
            
            const createdAuthor: Author = data.data as Author;
            setAuthor(createdAuthor);
            setCreateAuthor(false);
            
            return createdAuthor;
        }else{
            return author;
        }
    }

    const addCategories = async (jokeId: string) => {
        categories.forEach(async (cat: Category) => {
            const res: Response = await fetch(
                "/api/v1/joke/" + jokeId + "/category/" + cat.id, {
                method: "POST"
            });
            
            if (res.status === 500) {
                throwError(res.status, res.statusText);
            } else if (!res.ok) {
                const data = await res.json();
                if (data.error !== undefined) throwError(res.status, data.error);
                else throwError(res.status, data.status);
            }
        });
    }
    
    const postJoke = () => {
        postAuthor().then((author) => {
            
            const createData: JokeCreateData = {
                title: title,
                text: text,
                visibility: visible ? "visible" : "hidden",
                authorId: author === undefined ? "" : author.id
            }
            
            return fetch("/api/v1/joke/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(createData)
            });
        }).then(async res => {
            if (res.status === 500) {
                throwError(res.status, res.statusText);
            } else if (!res.ok) {
                const data = await res.json();
                if (data.error !== undefined) throwError(res.status, data.error);
                else throwError(res.status, data.status);
            }
            return res.json();
        }).then((data: any) => {
            addCategories(data.data.id);
        }).then(() => {
            closeError();
            cancel();
        });
    }
    
    return (
        <>
            {toDashboard ? <Redirect to="/" /> : null}
            <Background />
            <ErrorBanner />
            <Form theme={theme}>
                <Input value={title} onChange={event => setTitle(event.target.value)} theme={theme} placeholder={"Title"} />
                <div style={{height:"1rem"}} />
                <TextArea value={text} onChange={event => setText(event.target.value)} theme={theme} placeholder={"Joke..."} />
                <div style={{height:"1rem"}} />
                <SelectCategories values={categories} setValues={setCategories} />
                <Seperator theme={theme} />
                <SelectAuthor
                    setName={setNewAuthorName}
                    name={newAuthorName}
                    setSignature={setNewAuthorSignature}
                    signature={newAuthorSignature}
                    createAuthor={createAuthor}
                    setCreateAuthor={setCreateAuthor}
                    selectedAuthor={author}
                    setSelectedAuthor={setAuthor}
                />
                <Seperator theme={theme} />
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline" }}>
                    <label style={{ marginRight: "2rem" }}>
                        <Input checked={visible} onChange={event => setVisible(event.target.checked)} theme={theme} type={"checkbox"} />
                        <span style={{color: theme.textFont}}>{"Visible on dashboard"}</span>
                    </label>
                    <Button type="button" onClick={cancel} theme={theme}>Cancel</Button>
                    <div style={{ width: "1rem" }} />
                    <Button type="button" onClick={postJoke} theme={theme}>Post Joke</Button>
                </div>
            </Form>
        </>
    );
}