"use client";

import useSWR from "swr";
// import { usePosts } from "@/store";
import {useState} from "react";
import {getPostsBySearch} from "@/services/getPosts";


type PostSearchProps = {
	onSearch: (value: any) => void;
}

const PostSearch = () => {
	const { mutate } = useSWR("posts");
	const [search, setSearch] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const posts = await getPostsBySearch(search);
		console.log(posts)
		mutate(posts)
	};

	return (<div>
		<form action="" onSubmit={handleSubmit}>
			<input
				type="search"
				placeholder={'Search...'}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<button type={"submit"}>Search</button>
		</form>
	</div>)

}

export default PostSearch;

