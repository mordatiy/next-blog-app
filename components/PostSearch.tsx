'use client'

import {useState} from "react";
import {getPostsBySearch} from "@/services/getPosts";

type PostSearchProps = {
	onSearch: (value: any) => void;
}

const PostSearch = ({ onSearch }: PostSearchProps) => {

	const [search, setSearch] = useState('');
	// const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {}
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const posts = await getPostsBySearch(search);

		console.log(posts)
		
		onSearch(posts)
		// mutate(posts);
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

