import {Metadata, ResolvingMetadata} from "next";

// about/team?fname=AAAA&lname=BBBB
type Props = {
	params: Promise<{ id: string }>
	searchParams: Promise<{
		fname?: string
		lname?: string
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
		title: `Teammate: `+id,
		// title: product.title,
		// openGraph: {
		// 	images: ['/some-specific-page-image.jpg', ...previousImages],
		// },
	}
}


export default async function Team ({ params, searchParams }: Props) {
	const { id } = await params
	const { fname, lname } = await searchParams

	return (<>
			<h1>Team</h1>
		<h1>ID: {id}</h1>
		<p>FNAME: {fname}</p>
		<p>LNAME: {lname}</p>
	</>)

}