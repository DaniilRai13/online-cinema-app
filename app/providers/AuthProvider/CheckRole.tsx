"use client"
import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import { redirect, usePathname } from 'next/navigation'
import { FC } from 'react'

const CheckRole: FC<TypeComponentAuthFields> = ({ children, Component: { isOnlyUser, isOnlyAdmin } }) => {

	const { user } = useAuth()
	const pathname = usePathname()

	const Children = () => {
		return <>{children}</>
	}

	if (!isOnlyAdmin && !isOnlyUser) return <Children /> // not auth person
	if (user?.isAdmin) return <Children />
	if (isOnlyAdmin) {
		if (pathname !== '/404') redirect('/404')
		return null
	}

	const isUser = user && !user.isAdmin

	if (isUser && isOnlyUser) return <Children />
	else {
		if (pathname !== '/auth') redirect('/auth')
		return null
	}

	return <>CheckRole</>
}

export default CheckRole