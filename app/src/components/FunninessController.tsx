import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { Joke, JokePatchData } from "../types/Joke";

const ControllerWrapper = styled.div`
    color: ${props => props.theme.funninessFont};
    margin: 1.5rem;
`;

interface ButtonProps {
    clicked: boolean
}

const LikeButton = styled.a<ButtonProps>`
    color: ${props => props.clicked ? props.theme.likeClicked : props.theme.like};
    margin: 0.5rem;
    cursor: pointer;
    
    :hover {
        color: ${props => props.clicked ? props.theme.likeClicked : props.theme.likeHover};
    }
`;

const DislikeButton = styled.a<ButtonProps>`
    color: ${props => props.clicked ? props.theme.dislikeClicked : props.theme.dislike};
    margin: 0.5rem;
    cursor: pointer;
    
    :hover {
        color: ${props => props.clicked ? props.theme.dislikeClicked : props.theme.dislikeHover};
    }
`;

export type FunninessControllerProps = {
    joke: Joke
}

export const FunninessController: React.FC<FunninessControllerProps> = (args) => {
    const { theme } = useContext(ThemeContext);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    
    //Send new funniness to api
    const updateJoke = (action: "like" | "dislike") => {

        let newFunniness = args.joke.funniness;
        if(action === "like"){
            if(liked) return;
            newFunniness = disliked ? args.joke.funniness +2 : args.joke.funniness +1;
        }else{
            if(disliked) return;
            newFunniness = liked ? args.joke.funniness -2 : args.joke.funniness -1;
        }

        //Prepare patched joke
        const patchData: JokePatchData = {
            title: args.joke.title,
            text: args.joke.text,
            authorId: args.joke.author.id,
            visibility: args.joke.visibility,
            funniness: newFunniness
        }

        //Patch joke
        fetch("/api/v1/joke/" + args.joke.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchData)
        }).then(async (res: Response) => {
            if(res.ok){
                setLiked(action === "like" ? true: false);
                setDisliked(action === "dislike" ? true: false);

                args.joke.funniness = newFunniness;
            }
        });
    }
    
    return (
        <ControllerWrapper theme={theme}>
            <LikeButton clicked={liked} theme={theme} onClick={() => updateJoke("like")}>&#9650;</LikeButton>
            {args.joke.funniness}
            <DislikeButton clicked={disliked} theme={theme} onClick={() => updateJoke("dislike")}>&#9660;</DislikeButton>
        </ControllerWrapper>
    );
}