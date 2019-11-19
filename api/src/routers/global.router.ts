import { Router } from "express";
import { jokeRouter } from "./joke.router";
import { authorRouter } from "./author.router";
import { categoryRouter } from "./category.router";

//Create router
export const globalRouter: Router = Router({ mergeParams: true });

//Register routes
globalRouter.use("/joke", jokeRouter);
globalRouter.use("/author", authorRouter);
globalRouter.use("/category", categoryRouter);