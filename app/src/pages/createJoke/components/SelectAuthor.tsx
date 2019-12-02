import React, { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import styled from "styled-components";
import { Author } from "../../../types/Author";
import { useFetch } from "../../../hooks/UseFetch";
import { Button, TextArea, Input } from "../../../components/FormItems";
import Creatable from "react-select/creatable";

const AuthorWrapper = styled.div`
    display: flex;
    flex-direction: column;
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

    //Style for creatable
    const creatableStyle = (provided: React.CSSProperties) => {
        return {
            ...provided,
            backgroundColor: theme.accent1,
            border: "none",
            outline: "none",
            color: theme.textFont
        };
    }
    
    //Create new author
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

    //Selecting existing author
    } else {
        return (
            <AuthorWrapper>
                <Creatable
                    styles={{
                        control: creatableStyle,
                        option: creatableStyle,
                        menu: creatableStyle,
                        singleValue: creatableStyle,
                        input: creatableStyle,
                        noOptionsMessage: creatableStyle
                    }}
                    placeholder={"Select author..."}
                    isLoading={loading}
                    options={data}
                    getOptionLabel={(option: Author) => option.name}
                    value={args.selectedAuthor}
                    onChange={(value: any) => args.setSelectedAuthor(value)}
                />
                <div style={{height:"1rem"}} />
                <Button onClick={() => args.setCreateAuthor(true)} theme={theme}>
                    Create new author
                </Button>
            </AuthorWrapper>
        );
    }
}