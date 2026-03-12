"use client"

export default function ErrorWrapper({error}: { error: Error }) {
	return <h2>Opps... {error.message}</h2>
}