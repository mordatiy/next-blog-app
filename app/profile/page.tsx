import {auth} from "@/auth";

export default async function Profile() {
	const session = await auth()

	console.log(session)

	if (!session) return <div>Not authenticated</div>

	return (
		<div>
			<h1>Profile of {session?.user?.name}</h1>
			<p>{session?.user?.email}</p>
			{session?.user?.image && <img src={session.user.image} alt="" />}
			<p>RoleID: {session?.user?.role_id}</p>
		</div>
	);
}