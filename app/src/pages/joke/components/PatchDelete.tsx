import React, { useContext, useState } from "react";
import { Button } from "../../../components/Button";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styled from "styled-components";
import { Joke } from "../../../types/Joke";
import { Redirect } from "react-router";

const DeletePatchWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
`;

export type PatchDeleteProps = {
    joke: Joke
}

export const PatchDelete: React.FC<PatchDeleteProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const [toDashboard, setToDashboard] = useState<boolean>(false);

    const deleteJoke = () => {
        if(!window.confirm("Are you sure to delete the joke?")) return;
        fetch("/api/v1/joke/" + args.joke.id, {
            method:"DELETE"
        }).then((res: Response) => {
            if(res.ok){
                setToDashboard(true);
            }
        });
    }

    return (
        <>
        {toDashboard ? <Redirect to="/" /> : null}
        <DeletePatchWrapper>
            <Button onClick={() => alert("Not implemented yet :/")} theme={theme}>Edit</Button>
            <div style={{width: ".5rem"}} />
            <Button onClick={deleteJoke} style={{backgroundColor: theme.dislikeHover}} theme={theme}>Delete</Button>
        </DeletePatchWrapper>
        </>
    );
}