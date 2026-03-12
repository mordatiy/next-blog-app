// /blog/12?lang=en&sort=new
import {Metadata, ResolvingMetadata} from "next";
import Link from "next/link";

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
	// fetch data
	// const product = await fetch(`https://.../${id}`).then((res) => res.json())

	// optionally access and extend (rather than replace) parent metadata
	// const previousImages = (await parent).openGraph?.images || []

	return {
		title: `Blog ID: `+id,
		// title: product.title,
		// openGraph: {
		// 	images: ['/some-specific-page-image.jpg', ...previousImages],
		// },
	}
}

async function getData()  {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
		next: {
			revalidate: 60
		}
	})

	if (!response.ok) throw new Error("Unable to fetch data.");

	return response.json()
}

export default async function Post({ params, searchParams }: Props) {
	const { id } = await params
	const { lang, sort } = await searchParams
	const posts = await getData()

	return (
		<>
			<h1>ID: {id}</h1>
			<p>Lang: {lang}</p>
			<p>Sort: {sort}</p>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={`/blog/${post.id}`}>{post.title}</Link>
					</li>
				))}
			</ul>
		</>
	)
}