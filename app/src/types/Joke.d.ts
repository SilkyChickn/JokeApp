
export type Joke = {
    id: string,
	title: string,
    text: string,
    funniness: number,
	author: Author,
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