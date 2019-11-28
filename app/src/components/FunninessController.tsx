import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";
import { Joke } from "../types/Joke";

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
    
    const like = () => {
        if(liked) return;
        if(disliked) args.joke.funniness += 2;
        else args.joke.funniness++;
        setLiked(true);
        setDisliked(false);
        updateJoke();
    }

    const dislike = () => {
        if(disliked) return;
        if(liked) args.joke.funniness -= 2;
        else args.joke.funniness--;
        setLiked(false);
        setDisliked(true);
        updateJoke();
    }
    
    const updateJoke = () => {
        try {
            fetch("/api/v1/joke/" + args.joke.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(args.joke)
            });
        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <ControllerWrapper theme={theme}>
            <LikeButton clicked={liked} theme={theme} onClick={like}>&#9650;</LikeButton>
            {args.joke.funniness}
            <DislikeButton clicked={disliked} theme={theme} onClick={dislike}>&#9660;</DislikeButton>
        </ControllerWrapper>
    );
}