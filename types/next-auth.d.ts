import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {

	interface Session {
		user: {
			role_id?: number
		} & DefaultSession["user"]
	}

	interface User {
		role_id?: number
	}

}

declare module "next-auth/jwt" {

	interface JWT {
		role_id?: number
	}

}