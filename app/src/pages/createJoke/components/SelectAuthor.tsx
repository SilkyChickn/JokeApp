import React, { useState, useContext } from "react";
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

export const SelectAuthor: React.FC = () => {
    const [createAuthor, setCreateAuthor] = useState<boolean>(false);
    const { theme } = useContext(ThemeContext);

    const [value, setValue] = useState<Author>();
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
    
    if (createAuthor) {
        return (
            <AuthorWrapper>
                <Input theme={theme} placeholder={"Author Name"} />
                <TextArea theme={theme} placeholder={"Signature"} />
                <Button onClick={() => setCreateAuthor(false)} theme={theme}>
                    Select existing author
                </Button>
            </AuthorWrapper>
        );
    } else {
        return (
            <AuthorWrapper>
                <CreatableSelect
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
                    value={value}
                    onChange={(value: any) => setValue(value)}
                /><br />
                <Button onClick={() => setCreateAuthor(true)} theme={theme}>
                    Create new author
                </Button>
            </AuthorWrapper>
        );
    }
}