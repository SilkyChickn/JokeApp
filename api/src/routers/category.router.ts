import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

//Create router
export const categoryRouter: Router = Router({ mergeParams: true });

//Register routes
categoryRouter.get("/", CategoryController.getAllCategories);
categoryRouter.get("/:categoryId", CategoryController.getSingleCategory);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.patch("/:categoryId", CategoryController.patchCategory);
categoryRouter.delete("/:categoryId", CategoryController.deleteCategory);