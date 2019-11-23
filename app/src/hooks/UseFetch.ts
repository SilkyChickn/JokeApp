import { useEffect, useState } from "react";
import { Error } from "../types/Error";

/**Requesting data from the url and returning as type T
 * 
 * @param url Url to request data from
 */
export function useFetch<T>(url : string){
    
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = () => {
        fetch(url, {
            method: "GET"
        }).then(res => {
            if(!res.ok){
                setError({code: res.status, text: res.statusText});
                throw res.status + ": " + res.statusText;
            }
            return res.json();
        }).then(json => {
            const fetchedData = json.data as T;
            
            setData(fetchedData);
            setLoading(false);
            setError(null);
        });
    }
    
    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    return {data, loading, error};
}
