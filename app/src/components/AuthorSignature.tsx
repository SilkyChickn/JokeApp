import React, { useContext } from "react";
import { Author } from "../types/Author";
import styled from "styled-components";
import { ThemeContext } from "../contexts/ThemeContext";

const Signature = styled.div`
    color: ${props => props.theme.signatureFont};
    background-color: ${props => props.theme.accent2};

    font-style: italic;

    margin: 0;
    padding: 1.5rem;
    //border-top: 1px solid #000;
`;

const AuthorName = styled.div`
    font-style: normal;
    font-size: 1.25rem;
    
    margin: 0;
`;

export type AuthorSignatureProps = {
    author: Author
}

export const AuthorSignature: React.FC<AuthorSignatureProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <Signature theme={theme} className={"signature"}>
            <AuthorName>{args.author.name}</AuthorName>
            {args.author.signature}
        </Signature>
    );
}