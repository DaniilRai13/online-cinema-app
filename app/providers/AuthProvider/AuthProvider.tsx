import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
import Cookies from 'js-cookie'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { FC, ReactNode, useEffect, useState } from 'react'

const DynamicImportRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<TypeComponentAuthFields & { children: ReactNode }> = ({ children, Component: { isOnlyUser, isOnlyAdmin } }) => {
	const [isLoading, setIsLoading] = useState(true)

	const { user } = useAuth()
	const { logout, checkAuth } = useActions()
	// const router = useRouter()
	const pathname = usePathname()

	const Children = () => {
		return <>{children}</>
	}

	useEffect(() => {
		const accessToken = Cookies.get('accessToken')

		if (accessToken) {
			checkAuth()
		}
		setIsLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		const refreshToken = Cookies.get('refreshToken')
		if (!refreshToken && user) {
			logout()
		}
	}, [pathname])


	return isLoading ? <div> Loading...</div > : (!isOnlyAdmin && !isOnlyUser
		? <Children />
		: <DynamicImportRole Component={{ isOnlyAdmin, isOnlyUser }}>
			{children}
		</DynamicImportRole>)
}

export default AuthProvider