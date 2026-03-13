import Navigation from "@/components/Navigation";

const NavItems = [
	{label: "Home", href: "/"},
	{label: "Blog", href: "/blog"},
	{label: "About", href: "/about"}
]

export default function TheHeader() {
	return(
		<header className={"container"}>
			<Navigation navLinks={NavItems} />
			{/*<Link href={"/"}>Home</Link>*/}
			{/*<Link href={"/blog"}>Blog</Link>*/}
			{/*<Link href={"/about"}>About</Link>*/}
		</header>
	)
}

