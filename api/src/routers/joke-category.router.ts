import { Router } from "express";
import { JokeCategoryController } from "../controllers/joke-category.controller";

//Create router
export const jokeCategoryRouter: Router = Router({ mergeParams: true });

//Register routes
jokeCategoryRouter.post('/:categoryId', JokeCategoryController.addCategoryToJoke);
jokeCategoryRouter.delete('/:categoryId', JokeCategoryController.removeCategoryFromJoke);