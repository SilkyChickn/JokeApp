import { Router } from "express";
import { JokeController } from "../controllers/joke.controller";
import { jokeCategoryRouter } from "./joke-category.router";

//Create router
export const jokeRouter: Router = Router({ mergeParams: true });

//Use of jokeCategoryRouter for adding and removing categories from jokes
jokeRouter.use("/:jokeId/category", jokeCategoryRouter);

//Register routes
jokeRouter.get("/", JokeController.getAllJokes);
jokeRouter.get("/jokes.csv", JokeController.downloadAllJokes);
jokeRouter.get("/:jokeId", JokeController.getSingleJoke);
jokeRouter.get("/:jokeId/gif", JokeController.getGifsFromJoke);
jokeRouter.post("/", JokeController.createJoke);
jokeRouter.patch("/:jokeId", JokeController.patchJoke);
jokeRouter.delete("/:jokeId", JokeController.deleteJoke);