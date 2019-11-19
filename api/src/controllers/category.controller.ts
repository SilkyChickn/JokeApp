import { Response, Request, NextFunction } from "express";
import { Repository, getRepository, MoreThanOrEqual } from "typeorm";
import { validate } from "class-validator";
import { Category } from "../entities/category";

export class CategoryController {

    /**Getting all categories
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
        const catRepo: Repository<Category> = getRepository(Category);
        const categories: Category[] = await catRepo.find();
        res.send({ status: "ok", data: categories });
    }

    /**Getting a single category from its id
     * returns 404, if category could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async getSingleCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId: string = req.params.categoryId;
        const catRepo: Repository<Category> = getRepository(Category);

        try {
            const category: Category = await catRepo.findOneOrFail(categoryId);
            res.send({ status: "ok", data: category });
        } catch (error) {
            res.status(404).send({ status: "category not found" });
        }
    }

    /**Creating a single category
     * returns 400 if the category data is corrupt
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { title } = req.body;

        //Create category
        const category: Category = new Category();
        category.title = title;
        
        //Validate category
        const errors = await validate(category);
        if(errors.length > 0){
            res.status(400).send({ status: "bad request", errors: errors });
            return;
        }

        //Save category
        const catRepo: Repository<Category> = getRepository(Category);
        const createdCategory: Category = await catRepo.save(category);
        res.send({ status: "ok", data: createdCategory });
    }

    /**Updating a single category
     * returns 404, if the category could not be found
     * returns 400, if new category data is corrupt
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async patchCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId: string = req.params.categoryId;
        const { title } = req.body;

        const catRepo: Repository<Category> = getRepository(Category);

        try {
            const category: Category = await catRepo.findOneOrFail(categoryId);
            category.title = title;

            //Validate category
            const errors = await validate(category);
            if(errors.length > 0){
                res.status(400).send({ status: "bad request", errors: errors });
                return;
            }

            const createdCategory: Category = await catRepo.save(category);
            res.send({ status: "ok", data: createdCategory });
        } catch (error) {
            res.status(404).send({ status: "category not found" });
        }
    }

    /**Deleting a single category
     * returns 404, if the category could not be found
     * 
     * @param req Request
     * @param res Response
     * @param next Next function
     */
    public static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const categoryId: string = req.params.categoryId;

        const catRepo: Repository<Category> = getRepository(Category);
        try {
            const category: Category = await catRepo.findOneOrFail(categoryId);
            await catRepo.remove(category);
            res.send({ status: "ok" });
        } catch (error) {
            res.status(404).send({ status: "category not found" });
        }
    }
}