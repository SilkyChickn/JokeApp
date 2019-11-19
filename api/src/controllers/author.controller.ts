import { Response, Request, NextFunction } from "express";
import { Repository, getRepository, MoreThanOrEqual } from "typeorm";
import { validate } from "class-validator";
import { Author } from "../entities/author";

export class AuthorController {

    /**Getting all authors
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async getAllAuthors(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorRepo: Repository<Author> = getRepository(Author);
        const authors: Author[] = await authorRepo.find();
        res.send({ status: "ok", data: authors });
    }

    /**Getting a single author from its id
     * returns 404, if author could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async getSingleAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorId: string = req.params.authorId;
        const authorRepo: Repository<Author> = getRepository(Author);

        try {
            const author: Author = await authorRepo.findOneOrFail(authorId);
            res.send({ status: "ok", data: author });
        } catch (error) {
            res.status(404).send({ status: "author not found" });
        }
    }

    /**Creating a single author
     * returns 400 if the author data is corrupt
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async createAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name, signature } = req.body;

        //Create author
        const author: Author = new Author();
        author.name = name;
        author.signature = signature;
        
        //Validate author
        const errors = await validate(author);
        if(errors.length > 0){
            res.status(400).send({ status: "bad request", errors: errors });
            return;
        }

        //Save author
        const authorRepo: Repository<Author> = getRepository(Author);
        const createdAuthor: Author = await authorRepo.save(author);
        res.send({ status: "ok", data: createdAuthor });
    }

    /**Updating a single author
     * returns 404, if the author could not be found
     * returns 400, if new author data is corrupt
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async patchAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorId: string = req.params.authorId;
        const { name, signature } = req.body;

        const authorRepo: Repository<Author> = getRepository(Author);

        try {
            const author: Author = await authorRepo.findOneOrFail(authorId);
            author.name = name;
            author.signature = signature;

            //Validate author
            const errors = await validate(author);
            if(errors.length > 0){
                res.status(400).send({ status: "bad request", errors: errors });
                return;
            }

            const createdAuthor: Author = await authorRepo.save(author);
            res.send({ status: "ok", data: createdAuthor });
        } catch (error) {
            res.status(404).send({ status: "author not found" });
        }
    }

    /**Deleting a single author
     * returns 404, if the author could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async deleteAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authorId: string = req.params.authorId;

        const authorRepo: Repository<Author> = getRepository(Author);
        try {
            const author: Author = await authorRepo.findOneOrFail(authorId);
            await authorRepo.remove(author);
            res.send({ status: "ok" });
        } catch (error) {
            res.status(404).send({ status: "author not found" });
        }
    }
}