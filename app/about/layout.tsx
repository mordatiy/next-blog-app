import Link from "next/link";
import type {Metadata} from "next";

export const metadata: Metadata = {
	title: "About | Blog App"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<h1>About Us Page</h1>
			<ul>
				<li><Link href={"/about/contacts"}>Contacts</Link></li>
				<li><Link href={"/about/team"}>Team</Link></li>
			</ul>
			{children}
		</div>
	);
}
