import { Response, Request, NextFunction } from "express";
import { Repository, getRepository, MoreThanOrEqual } from "typeorm";
import { Joke } from "../entities/joke";
import { Author } from "../entities/author";
import { validate } from "class-validator";
import { CsvExport } from "../modules/csvexport";
import { CortialIO } from "../modules/corticalio";
import { Giphy } from "../modules/giphy";
import e = require("express");

export class JokeController {

    /**Getting all jokes
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async getAllJokes(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        //Query parameters
        const minFunniness = req.query.minFunniness == undefined ? 0 : req.query.minFunniness;

        //Get visible jokes
        const jokeRepo: Repository<Joke> = getRepository(Joke);
        const jokes: Joke[] = await jokeRepo.find({
            where: {
                visibility: "visible",
                funniness: MoreThanOrEqual(minFunniness)
            }
        });
        res.send({ status: "ok", data: jokes });
    }

    /**Storing all jokes into a csv file and return it as download
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async downloadAllJokes(req: Request, res: Response, next: NextFunction): Promise<void> {
        
        //Query parameters
        const minFunniness = req.query.minFunniness == undefined ? 0 : req.query.minFunniness;

        //Get visible jokes
        const jokeRepo: Repository<Joke> = getRepository(Joke);
        const jokes: Joke[] = await jokeRepo.find({
            where: {
                visibility: "visible",
                funniness: MoreThanOrEqual(minFunniness)
            }
        });

        const csvData: string = await CsvExport.createCsvFile(jokes);
        
        //File download
        res.setHeader("Content-type", "text/csv");
        res.setHeader("Content-disposition", "attachment; filename=jokes.csv");
        res.send(csvData);
    }

    /**Getting a single joke from its id
     * returns 404, if joke could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async getSingleJoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const jokeId: string = req.params.jokeId;
        const jokeRepo: Repository<Joke> = getRepository(Joke);

        try {
            const joke: Joke = await jokeRepo.findOneOrFail(jokeId);
            res.send({ status: "ok", data: joke });
        } catch (error) {
            res.status(404).send({ status: "joke not found" });
        }
    }

    /**Getting a gif from giphy, that matches a specific joke from its id
     * 
     * First it finds the keywords of the joke with the cortical io api, then 
     * it picks the most relevant keyword and searches a matching gif with the giphy api
     * 
     * returns 404, if joke could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async getGifsFromJoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const jokeId: string = req.params.jokeId;
        const jokeRepo: Repository<Joke> = getRepository(Joke);
        
        try {
            const joke: Joke = await jokeRepo.findOneOrFail(jokeId);

            const keywords: string[] = await CortialIO.getKeywords(joke.text);

            //Getting gifs for keywords
            try {
                const pResult = keywords.map(async (e: string) => {
                    return {
                        keyword: e,
                        gif: await Giphy.getGifUrl(e)
                    }
                });
                const result = await Promise.all(pResult);
    
                res.send({ status: "ok", data: result });
            } catch(e) {
                res.status(500).send({ status: "external api error" });
            }
        } catch (error) {
            res.status(404).send({ status: "jokes not found" });
        }
    }

    /**Creating a single joke and setting its author by id
     * returns 404 if the author could not be found
     * returns 400 if the joke data is corrupt or not in english
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async createJoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title, text, visibility, authorId } = req.body;

        try {
            
            //Get author from id
            const authorRepo: Repository<Author> = getRepository(Author);
            const author: Author = await authorRepo.findOneOrFail(authorId);
            
            //Create joke
            const joke: Joke = new Joke();
            joke.title = title;
            joke.text = text;
            joke.visibility = visibility;
            joke.author = author;
            
            //Validate joke
            const errors = await validate(joke);
            if(errors.length > 0){
                res.status(400).send({ 
                    status: "bad request", 
                    error: errors[0].constraints[Object.keys(errors[0].constraints)[0]] 
                });
                return;
            }

            //Check if joke is in english
            try {
                const jokeLanguage = await CortialIO.getLanguage(text);
                if(jokeLanguage !== "en"){
                    res.status(400).send({ status: "bad request", error: "joke has to be in english, maybe its too short to identify"});
                    return;
                }
            } catch(e) {
                res.status(500).send({ status: "external api error" })
            }

            const jokeRepo: Repository<Joke> = getRepository(Joke);
            const createdJoke: Joke = await jokeRepo.save(joke);

            res.send({ status: "ok", data: createdJoke });
        } catch (error) {
            res.status(404).send({ status: "author not found" });
        }
    }

    /**Updating a single joke
     * returns 404, if joke or author could not be found
     * returns 400, if new joke data is corrupt
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async patchJoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const jokeId: string = req.params.jokeId;
        const { title, text, funniness, visibility, authorId } = req.body;

        const jokeRepo: Repository<Joke> = getRepository(Joke);
        const authorRepo: Repository<Author> = getRepository(Author);

        try {
            const joke: Joke = await jokeRepo.findOneOrFail(jokeId);
            const author: Author = await authorRepo.findOneOrFail(authorId);
            
            //Check if joke is in english
            const jokeLanguage = await CortialIO.getLanguage(text);
            if(jokeLanguage !== "en"){
                res.status(400).send({ status: "bad request", errors: "joke has to be in english"});
                return;
            }
            
            //Update data
            joke.title = title;
            joke.text = text;
            joke.funniness = funniness;
            joke.visibility = visibility;
            joke.author = author;
            
            //Validate joke
            const errors = await validate(joke);
            if(errors.length > 0){
                res.status(400).send({ status: "bad request", errors: errors[0].constraints });
                return;
            }

            const createdJoke: Joke = await jokeRepo.save(joke);
            res.send({ status: "ok", data: createdJoke });
        } catch (error) {
            res.status(404).send({ status: "joke or author not found" });
        }
    }

    /**Deleting a single joke
     * returns 404, if the joke could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async deleteJoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const jokeId: string = req.params.jokeId;

        const jokeRepo: Repository<Joke> = getRepository(Joke);
        try {
            const joke: Joke = await jokeRepo.findOneOrFail(jokeId);
            await jokeRepo.remove(joke);
            res.send({ status: "ok" });
        } catch (error) {
            res.status(404).send({ status: "joke not found" });
        }
    }
}