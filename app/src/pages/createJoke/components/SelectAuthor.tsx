import React, { useContext } from "react";
import { Input, TextArea, Button } from "../PostJokePage";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";
import { Author } from "../../../types/Author";
import { useFetch } from "../../../hooks/UseFetch";

const AuthorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
`;

const Selector = styled(CreatableSelect)`
    margin-bottom: 1rem;
`;

export type SelectAuthorProps = {
    selectedAuthor: Author | undefined,
    setSelectedAuthor: (author: Author) => void,
    createAuthor: boolean,
    setCreateAuthor: (createAuthor: boolean) => void,
    name: string, 
    setName: (name: string) => void,
    signature: string,
    setSignature: (signature: string) => void
}

export const SelectAuthor: React.FC<SelectAuthorProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const { data, loading } = useFetch("/api/v1/author/");

    const creatableStyle = (provided: React.CSSProperties) => {
        return {
            ...provided,
            backgroundColor: theme.accent1,
            border: "none",
            outline: "none",
            color: theme.textFont
        };
    }
    
    if (args.createAuthor) {
        return (
            <AuthorWrapper>
                <Input value={args.name} onChange={event => args.setName(event.target.value)} theme={theme} placeholder={"Author Name"} />
                <TextArea value={args.signature} onChange={event => args.setSignature(event.target.value)} theme={theme} placeholder={"Signature"} />
                <Button onClick={() => args.setCreateAuthor(false)} theme={theme}>
                    Select existing author
                </Button>
            </AuthorWrapper>
        );
    } else {
        return (
            <AuthorWrapper>
                <Selector
                    styles={{
                        control: creatableStyle,
                        option: creatableStyle,
                        menu: creatableStyle,
                        singleValue: creatableStyle,
                        input: creatableStyle,
                        noOptionsMessage: creatableStyle
                    }}
                    isLoading={loading}
                    options={data}
                    getOptionLabel={(option: Author) => option.name}
                    value={args.selectedAuthor}
                    onChange={(value: any) => args.setSelectedAuthor(value)}
                />
                <Button onClick={() => args.setCreateAuthor(true)} theme={theme}>
                    Create new author
                </Button>
            </AuthorWrapper>
        );
    }
}