"use client";

import useSWR from "swr";
import Link from "next/link";

import {getAllPosts, Post} from "@/services/getPosts";

type PostsProps = {
	posts: Post[]
}

const Posts = () => {
	const { data: posts, isLoading } = useSWR("posts", getAllPosts);


	return isLoading ? (
		<h3>Loading... </h3>
	) : (
		<ul>
			{posts.map((post: Post) => (
				<li key={post.id}>
					<Link href={`/blog/${post.id}`}>{post.title}</Link>
				</li>
			))}
		</ul>
	);
};

export default Posts;