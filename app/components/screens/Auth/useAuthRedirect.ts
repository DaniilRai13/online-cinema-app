import { useAuth } from '@/hooks/useAuth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { user } = useAuth()
	const search = useSearchParams()
	const { push } = useRouter()

	const redirect = search?.get('redirect') || '/'

	useEffect(() => {
		if (user) push(redirect)
	}, [
		user, push, redirect
	])
}