import React from "react";
import styled from "styled-components";
import { Error } from "../types/Error";

const LoadingText = styled.p`
    text-align: center;
    margin-top: 5rem;
    font-size: 1rem;

    @media all and (min-width: 800px) {
        font-size: 2rem;
    }
`;

export const LoadingContainer: React.FC = () => {
    return <LoadingText>Loading...</LoadingText>;
}