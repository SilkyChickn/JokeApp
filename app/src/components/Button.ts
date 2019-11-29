import styled from "styled-components";

export const Button = styled.button`
    color: ${props => props.theme.buttonFont};
    background-color: ${props => props.theme.likeHover};

    justify-self: right;
    font-size: 1rem;

    border: 0;
    border-radius: .5rem;
    padding: .5rem;
    max-width: 10rem;
    cursor: pointer;
    
    :focus {
        outline: 0;
    }
    :hover {
        color: ${props => props.theme.buttonFont};
        background-color: ${props => props.theme.likeClicked};
    }
`;