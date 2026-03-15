// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
//
// export const { handlers, auth, signIn, signOut } = NextAuth({
// 	providers: [
// 		Google({
// 			clientId: process.env.AUTH_GOOGLE_ID!,
// 			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
// 		}),
// 	],
// })





// // * * * * * *
//
//
// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
//
// export const { handlers, auth, signIn, signOut } = NextAuth({
// 	providers: [
// 		Google({
// 			clientId: process.env.AUTH_GOOGLE_ID!,
// 			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
// 		}),
// 	],
//
// 	callbacks: {
//
// 		async jwt({ token }) {
//
// 			const adminEmails = [
// 				"admin@gmail.com",
// 				"owner@gmail.com"
// 			]
//
// 			const editorEmails = [
// 				"editor@gmail.com"
// 			]
//
// 			if (token.email && adminEmails.includes(token.email)) {
// 				token.role_id = 1
// 			}
//
// 			if (token.email && editorEmails.includes(token.email)) {
// 				token.role_id = 2
// 			}
//
// 			return token
// 		},
//
// 		async session({ session, token }) {
// 			session.user.role_id = token.role_id
// 			return session
// 		},
//
// 	},
//
// })
//
// // * * * * * *


import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

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