
export type Joke = {
    id: string,
	title: string,
    text: string,
    funniness: number,
    author: Author,
    visibility: "visible" | "hidden"
    categories: Category[],
    createdAt: string,
    updatedAt: string
}

export type JokeCreateData = {
	title: string
    text: string,
    authorId: string,
    visibility: "visible" | "hidden"
}

export type JokePatchData = {
	title: string
    text: string,
    authorId: string,
    funniness: number,
    visibility: "visible" | "hidden"
}