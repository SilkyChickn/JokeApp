import { Request, Response, NextFunction } from "express";
import { Repository, getRepository } from "typeorm";
import { Category } from "../entities/category";
import { Joke } from "../entities/joke";

export class JokeCategoryController {

    /**Adding a category to a joke by their ids
     * Returns 404 if category or joke could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async addCategoryToJoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId: string = req.params.categoryId;
        const jokeId: string = req.params.jokeId;

        const categoryRepo: Repository<Category> = getRepository(Category);
        const jokeRepo: Repository<Joke> = getRepository(Joke);

        try {
            const category: Category = await categoryRepo.findOneOrFail(categoryId);
            let joke: Joke = await jokeRepo.findOneOrFail(jokeId);
            
            //Add category to joke if its not added yet
            if(!joke.categories.some((cat: Category) => cat.id === category.id)){
                joke.categories.push(category);
                joke = await jokeRepo.save(joke);
            }

            res.send({ status: "ok", data: joke })
        } catch (error) {
            res.status(404).send({ status: "category or joke not found" });
        }
    }

    /**Removing a category from a joke by their ids
     * returns 404, if joke or category could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async removeCategoryFromJoke(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId: string = req.params.categoryId;
        const jokeId: string = req.params.jokeId;

        const jokeRepo: Repository<Joke> = getRepository(Joke);

        try {
            let joke: Joke = await jokeRepo.findOneOrFail(jokeId);
            joke.categories = joke.categories.filter((cat: Category) => cat.id !== categoryId);
            joke = await jokeRepo.save(joke);
            res.send({ status: "ok", data: joke })
        } catch (error) {
            res.status(404).send({ status: "joke not found" });
        }
    }
}