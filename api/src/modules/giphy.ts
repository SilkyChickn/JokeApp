import Axios, { AxiosRequestConfig } from "axios";

export class Giphy {

    /**Key to connect to the giphy api
     */
    private static API_KEY: string = "xad0JJJyLGBWa9TA0cI1nUlCzMFpVOHs";

    /**Getting a matching gif as link for a specific keyword
     * 
     * @param keyword Keyword to get gif for
     */
    public static async getGifUrl(keyword: string): Promise<string> {
        const requestOptions: AxiosRequestConfig = {
            method: 'get',
            url: 'http://api.giphy.com/v1/gifs/translate',
            responseType: 'json',
            headers: {
                api_key: Giphy.API_KEY
            },
            params: {
                s: keyword
            }
        }
        
        const response = await Axios.request(requestOptions);

        return response.data.data.embed_url;
    }
}