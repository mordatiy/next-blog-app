// /blog/12?lang=en&sort=new
import {Metadata, ResolvingMetadata} from "next";

type Props = {
	params: Promise<{ id: string }>
	searchParams: Promise<{
		lang?: string
		sort?: string
	}>
}

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const { id } = await params
	const post = await getData(id)
	// console.log(post)
	
	// fetch data
	// const product = await fetch(`https://.../${id}`).then((res) => res.json())

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || []

	return {
		title: `${id} - ${post.title}`,
		// title: product.title,
		// openGraph: {
		// 	images: ['/some-specific-page-image.jpg', ...previousImages],
		// },
	}
}

async function getData(id: string)  {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`,
		{
			next: {
				revalidate: 60
			}
		})

	return response.json()
}

export default async function Post({ params, searchParams }: Props) {
	const { id } = await params
	const { lang, sort } = await searchParams
	const post = await getData(id)
	return (
		<>
			<h1>Post ID: {post.id}</h1>
			<h1>{post.title}</h1>
			{/*<p>Lang: {lang}</p>*/}
			{/*<p>Sort: {sort}</p>*/}
			<p>{post.body}</p>
		</>
	)
}