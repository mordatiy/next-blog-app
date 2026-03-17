import {GoogleButton} from "@/components/GoogleButton";
import {SignInForm} from "@/components/SignInForm";

type Props = {
	searchParams: Promise<{
		callbackUrl?: string;
	}>;
};

export default async function Signin({ searchParams }: Props) {
	const { callbackUrl } = await searchParams;

	return (
		<div className="stack">
			<h1>SignIn</h1>
			<GoogleButton callbackUrl={callbackUrl || "/profile"} />
			<div>or</div>
			<SignInForm />
		</div>
	);
}