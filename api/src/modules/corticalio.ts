import Axios, { AxiosRequestConfig } from "axios";

export class CortialIO {

    /**Key to get access to the cortical.io api
     */
    private static API_KEY: string = "bed70f80-071e-11ea-8f72-af685da1b20e";

    /**Getting the language of a text, over the cortical.io api
     * 
     * @param text Text to get language for
     * @returns ISO language tag or undefined, if an error occurrs
     */
    public static async getLanguage(text: string): Promise<string> {
        const requestOptions: AxiosRequestConfig = {
            method: "post",
            url: "http://api.cortical.io/rest/text/detect_language",
            responseType: "json",
            data: text,
            headers: {
                api_key: CortialIO.API_KEY
            }
        }

        const response = await Axios.request(requestOptions);

        return response.data.iso_tag;
    }

    /**Getting keywords of an english text, over the cortical.io api
     * 
     * @param text Text to get keywords from
     * @returns Keywords sorted by relevance
     */
    public static async getKeywords(text: string): Promise<any> {
        const requestOptions: AxiosRequestConfig = {
            method: "post",
            url: "http://api.cortical.io/rest/text/keywords?retina_name=en_associative",
            responseType: "json",
            data: text,
            headers: {
                api_key: CortialIO.API_KEY
            }
        }

        const response = await Axios.request(requestOptions);
        
        return response.data;
    }
}
