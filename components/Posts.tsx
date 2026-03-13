"use client";

import useSWR from "swr";
import Link from "next/link";

import {getAllPosts, Post} from "@/services/getPosts";

type PostsProps = {
	posts: Post[]
}

const Posts = () => {
	// const { data: posts, isLoading } = useSWR("posts", getAllPosts);
	const { data: posts, isLoading } = useSWR<Post[]>("posts", getAllPosts);

	// console.log(posts);

	if (isLoading) {
		return (<h3>Loading...</h3>)
	}
	if (!posts || !posts.length)  {
		return (<h3>No posts found</h3>)
	}

	return (
		<ul>
			{posts.map((post: Post) => (
				<li key={post.id}>
					<Link href={`/blog/${post.id}`}>{post.title}</Link>
				</li>
			))}
		</ul>
	)

}

export default Posts;