import type {User} from 'next-auth'
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {users} from '@/data/users';


const admins = [
	"mordatiykd@gmail.com",
	"owner@gmail.com"
]

const editors = [
	"dmitriy.kurgansky@gmail.com"
]

export const { handlers, auth, signIn, signOut } = NextAuth({

	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),
		Credentials({
			credentials: {
				email: { label: 'email', type: 'email', required: true },
				password: { label: 'password', type: 'password', required: true },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;

				const currentUser = users.find(user => user.email === credentials.email)

				if (currentUser && currentUser.password === credentials.password) {
					const { password, ...userWithoutPass } = currentUser;

					return userWithoutPass as User;
				}

				return null
			}
		})
	],

	callbacks: {
		async signIn({ user }) {
			const email = user.email

			if (!email) return false
			const whitelist = [...admins, ...editors]

			if (!whitelist.includes(email)) {
				return false
			}
			return true
		},

		async jwt({ token }) {
			if (token.email) {
				if (admins.includes(token.email)) {
					token.role_id = 1
				}
				if (editors.includes(token.email)) {
					token.role_id = 2
				}
			}
			return token
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.role_id = token.role_id as number
			}
			return session
		},
	},

})