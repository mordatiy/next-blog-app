import Link from "next/link";
import {Post} from "@/services/getPosts";

type PostsProps = {
	posts: Post[]
}

const Posts = ({posts}: PostsProps) => {
	return(
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