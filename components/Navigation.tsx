"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";

import {signOut, useSession} from "next-auth/react";

export type NavLink = {
	label: string
	href: string
}

export type Props = {
	navLinks: NavLink[]
}

export default function Navigation({ navLinks } : Props) {
	const pathname = usePathname()
	const session = useSession()
	console.log(session)

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
		{session?.data && <Link href="/profile">Profile</Link>}
		{session?.data ? (
			<Link href="#" onClick={() => signOut({ redirectTo: "/" })}>
				Sign Out
			</Link>
		) : (
			<Link href="/signin">SignIn</Link>
		)}
	</nav>)
}

