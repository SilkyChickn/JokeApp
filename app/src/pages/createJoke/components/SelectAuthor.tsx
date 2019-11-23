import React, { useState, useContext } from "react";
import { Input, TextArea, Button } from "../PostJokePage";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styled from "styled-components";

const AuthorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

export const SelectAuthor: React.FC = () => {
    const [createAuthor, setCreateAuthor] = useState<boolean>(false);
    const { theme } = useContext(ThemeContext);
    
    if(createAuthor){
        return (
            <AuthorWrapper>
                <Input theme={theme} placeholder={"Author Name"} />
                <TextArea theme={theme} placeholder={"Signature"} />
                <Button onClick={() => setCreateAuthor(false)} theme={theme}>
                    Select existing author
                </Button>
            </AuthorWrapper>
        );
    }else{
        return (
            <AuthorWrapper>
                <Input theme={theme} placeholder={"Author Name"} />
                <Button onClick={() => setCreateAuthor(true)} theme={theme}>
                    Create new author
                </Button>
            </AuthorWrapper>
        );
    }
}