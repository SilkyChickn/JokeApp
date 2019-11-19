import { Joke } from "../entities/joke";
import { Category } from "../entities/category";
import { promises as fs } from "fs";

export class CsvExport {
    
    /**Creating the csv file with the jokes, overrides the file if it exist
     * 
     * @param jokes Jokes to write into the file
     */
    public static async createCsvFile(jokes: Joke[]): Promise<string> {
        let jokesCsv = "ID;Title;Text;Funniness;CreateDate;UpdateDate;AuthorName;Categories\n";

        let counter = 1;
        jokes.forEach((joke: Joke) => {

            //Create categories string
            let categories: string = "";
            joke.categories.forEach((category: Category) => {
                categories += category.title + ", ";
            });
            
            //Create csv line
            jokesCsv += '"' + joke.id + '";"' + joke.title + '";"' + joke.text + '";"' + joke.funniness + '";"' + 
            joke.createdAt + '";"' + joke.updatedAt + '";"' + joke.author.name + '";"' + categories + '"\n';
        });

        return jokesCsv;
    }
}