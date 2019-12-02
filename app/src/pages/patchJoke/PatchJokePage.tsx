import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Joke, JokePatchData } from "../../types/Joke";
import { Redirect } from "react-router";
import { Button, Form, Input, TextArea, Seperator } from "../../components/FormItems";
import { AuthorSignature } from "../../components/AuthorSignature";
import { useFetch } from "../../hooks/UseFetch";
import { ErrorContainer } from "../../components/ErrorContainer";
import { LoadingContainer } from "../../components/LoadingContainer";
import { SelectCategories } from "../createJoke/components/SelectCategories";
import { Category } from "../../types/Category";
import { ErrorContext } from "../../contexts/ErrorContext";

export type PatchJokePageProps = {
    routerProps: any
}

export const PatchJokePage: React.FC<PatchJokePageProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const { closeError, setError } = useContext(ErrorContext);
    const { data, loading, error } = useFetch<Joke>("/api/v1/joke/" + args.routerProps.match.params.id);
    
    const [toJokePage, setToJokePage] = useState<boolean>(false);

    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(true);
    const [categories, setCategories] = useState<Category[]>([]);
    
    useEffect(() => {
        setTitle(data == null ? "" : data.title);
        setText(data == null ? "" : data.text);
        setVisible(data == null ? true : data.visibility === "visible" ? true : false);
        setCategories(data == null ? [] : data.categories);
    }, [data]);
    
    if(error) return <ErrorContainer error={error} />
    if(data === null || loading) return <LoadingContainer />
    
    const cancel = () => {
        setToJokePage(true);
    }
    
    const throwError = (code: number, message: string) => {
        setError({ code: code, text: message });
        throw Promise.reject(code + ": " + message);
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
    
    const patchJoke = () => {
        const patchData: JokePatchData = {
            title: title,
            text: text,
            visibility: visible ? "visible" : "hidden",
            funniness: data.funniness,
            authorId: data.author.id
        }
        
        fetch("/api/v1/joke/" + data.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(patchData)
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
            {toJokePage ? <Redirect to={"/joke/" + data.id} /> : null}
            <Form theme={theme}>
                <Input value={title} onChange={event => setTitle(event.target.value)} theme={theme} placeholder={"Title"} />
                <div style={{height:"1rem"}} />
                <TextArea value={text} onChange={event => setText(event.target.value)} theme={theme} placeholder={"Joke..."} />
                <div style={{height:"1rem"}} />
                <SelectCategories values={categories} setValues={setCategories} />
                <Seperator theme={theme} />
                <AuthorSignature author={data.author} />
                <div style={{height: "2rem"}} />
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline" }}>
                    <label style={{ marginRight: "2rem" }}>
                        <Input checked={visible} onChange={event => setVisible(event.target.checked)} theme={theme} type={"checkbox"} />
                        <span style={{color: theme.textFont}}>{"Visible on dashboard"}</span>
                    </label>
                    <Button type="button" onClick={cancel} theme={theme}>Cancel</Button>
                    <div style={{ width: "1rem" }} />
                    <Button type="button" onClick={patchJoke} theme={theme}>Save Changes</Button>
                </div>
            </Form>
        </>
    );
}