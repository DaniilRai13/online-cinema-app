"use client"
import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import { usePathname, useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'

const CheckRole: FC<TypeComponentAuthFields & { children: ReactNode }> = ({ children, Component: { isOnlyUser, isOnlyAdmin } }) => {

	const { user } = useAuth()
	const pathname = usePathname()
	const router = useRouter()
	
	const Children = () => {
		return <>{children}</>
	}

	if (!isOnlyAdmin && !isOnlyUser) return <Children /> // not auth person
	if (user?.isAdmin) return <Children />
	if (isOnlyAdmin) {
		if (pathname !== '/404') router.push('/404')
		return null
	}

	const isUser = user && !user.isAdmin

	if (isUser && isOnlyUser) return <Children />
	else {
		if (pathname !== '/auth') router.push('/auth')
		return null
	}
}

export default CheckRole