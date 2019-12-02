import React, { useContext } from "react";
import Creatable from "react-select/creatable";
import { useFetch } from "../../../hooks/UseFetch";
import { Category, CategoryCreateData } from "../../../types/Category";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { ErrorContext } from "../../../contexts/ErrorContext";

export type SelectCategoriesProps = {
    values: Category[],
    setValues: (values: Category[]) => void
}

export const SelectCategories: React.FC<SelectCategoriesProps> = (args) => {
    const { theme } = useContext(ThemeContext);
    const { setError } = useContext(ErrorContext);

    const { data, loading } = useFetch("/api/v1/category/");

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
    
    //Creatable values changing
    const valuesChanged = (value: any, actionMeta: any) => {
        if(actionMeta.action === "create-option"){
            value.forEach((element: any) => {
                if(element.__isNew__){
                    createAndAddCategory(element.label)
                }
            });
        }else if(actionMeta.action === "select-option"){
            args.setValues([...args.values, ...data.filter((cat: Category) => {
                return cat.id === actionMeta.option.id;
            })]);
        }else if(actionMeta.action === "remove-value"){
            args.setValues(args.values.filter((cat: Category) => {
                return cat.id !== actionMeta.removedValue.id;
            }));
        }else if(actionMeta.action === "pop-value"){
            const newValues = [...args.values];
            newValues.pop();
            args.setValues(newValues);
        }else if(actionMeta.action === "clear"){
            args.setValues([]);
        }
    }

    const createAndAddCategory = (title: string) => {
        const createData: CategoryCreateData = {
            title: title
        }

        fetch("/api/v1/category/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(createData)
        }).then((res: Response) => {
            if(!res.ok){
                setError({code: res.status, text: res.statusText});
                console.log(res);
                throw Promise.reject();
            }
            return res.json();
        }).then((data: any) => {
            const cat = data.data as Category;
            args.setValues([...args.values, cat]);
        });
    }
    
    return (
        <>
            <Creatable 
                styles={{
                    control: creatableStyle,
                    option: creatableStyle,
                    menu: creatableStyle,
                    multiValue: (provided: React.CSSProperties) => {
                        return {
                            ...provided,
                            backgroundColor: theme.categoryBackground,
                            border: "none",
                            outline: "none",
                            color: theme.categoryFont
                        }
                    },
                    input: creatableStyle,
                    noOptionsMessage: creatableStyle
                }} 
                isMulti={true} 
                isLoading={loading} 
                value={args.values} 
                placeholder={"Select categories..."} 
                options={data} 
                onChange={valuesChanged}
                getOptionLabel={(option: any) => {
                    if(option.title) return option.title;
                    else return option.label;
                }}
                getOptionValue={(option: any) => {
                    if(option.id) return option.id;
                    else return option.value;
                }}
            />
        </>
    );
}