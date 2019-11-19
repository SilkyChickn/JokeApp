import { Router } from "express";
import { AuthorController } from "../controllers/author.controller";

//Create router
export const authorRouter: Router = Router({ mergeParams: true });

//Register routes
authorRouter.get("/", AuthorController.getAllAuthors);
authorRouter.get("/:authorId", AuthorController.getSingleAuthor);
authorRouter.post("/", AuthorController.createAuthor);
authorRouter.patch("/:authorId", AuthorController.patchAuthor);
authorRouter.delete("/:authorId", AuthorController.deleteAuthor);