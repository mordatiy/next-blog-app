"use client"

// /blog/12?lang=en&sort=new
import {useEffect, useState} from "react";
import {getAllPosts} from "@/services/getPosts";
import Posts from "@/components/Posts";
import PostSearch from "@/components/PostSearch";

type Props = {
	params: Promise<{ id: string }>
	searchParams: Promise<{
		lang?: string
		sort?: string
	}>
}


type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
};

//
// export const metadata: Metadata = {
// 	title: "Blog | Next App",
// };

export default function Post({ params, searchParams }: Props) {
	const [posts, setPosts] = useState<Post[]>([])
	const [loading, setLoading] = useState(true)


	useEffect(() => {
		getAllPosts()
			.then(setPosts)
			.finally( ()=> setLoading(false));
	}, [])


	return (
		<>
			<h1>Blog Page</h1>
			<PostSearch onSearch={setPosts} />
			{loading ? <h3>Loading 33...</h3> : <Posts posts={posts} />}
		</>
	)
}