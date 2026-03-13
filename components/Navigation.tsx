"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";

export type NavLink = {
	label: string
	href: string
}

export type Props = {
	navLinks: NavLink[]
}

export default function Navigation({ navLinks } : Props) {
	const pathname = usePathname()

	return (<nav>
		{navLinks.map((link) => {
		const isActive = pathname === link.href
		return (
			<Link
				key={link.label}
				href={link.href}
				className={isActive ? "active" : ""}
			>{link.label}</Link>
		)
	})}
	</nav>)



		// <header className={"container"}>
		// 	<Link href={"/"}>Home</Link>
		// 	<Link href={"/blog"}>Blog</Link>
		// 	<Link href={"/about"}>About</Link>
		// </header>
}

