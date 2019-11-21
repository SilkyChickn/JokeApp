import React, { useState, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

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
    funniness: number
}

export const FunninessController: React.FC<FunninessControllerProps> = (args) => {
    const { theme } = useContext(ThemeContext);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    
    return (
        <ControllerWrapper theme={theme}>
            <LikeButton clicked={liked} theme={theme} onClick={() => {
                setLiked(true);
                setDisliked(false);
            }}>&#9650;</LikeButton>
            {args.funniness}
            <DislikeButton clicked={disliked} theme={theme} onClick={() => {
                setLiked(false);
                setDisliked(true);
            }}>&#9660;</DislikeButton>
        </ControllerWrapper>
    );
}