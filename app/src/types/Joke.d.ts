
export type Joke = {
	title: string,
    text: string,
    funniness: number,
	author: Author,
    categories: Category[],
    createdAt: string
}