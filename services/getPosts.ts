export type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
};


export const getAllPosts = async (): Promise<Post[]> => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");

	if (!response.ok) throw new Error("Unable to fetch posts.");

	return response.json();
};

export const getPostsBySearch = async (search: string) => {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts?q=${search}`
	);

	if (!response.ok) throw new Error("Unable to fetch posts.");

	return response.json();
};