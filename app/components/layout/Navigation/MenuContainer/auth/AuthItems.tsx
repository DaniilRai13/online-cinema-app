
import { getAdminHomeUrl } from '@/config/url.config'
import { useAuth } from '@/hooks/useAuth'
import { FC } from 'react'
import MenuItem from '../Menu/MenuItem/MenuItem'
import LogoutButton from './LogoutButton'

const AuthItems: FC = () => {
	const { user } = useAuth()

	return (
		<>
			{
				user?.isAdmin && <MenuItem item={
					{
						icon: 'MdOutlineLock',
						title: 'Admin Panel',
						link: getAdminHomeUrl()
					}
				} />
			}
			{user ? <>
				<MenuItem item={{
					icon: 'MdSettings',
					title: 'Profile',
					link: '/profile'
				}} />
				<LogoutButton />
			</>
				: <MenuItem item={{
					icon: 'MdLogin',
					title: 'Login',
					link: '/auth'
				}} />}


		</>
	)
}

export default AuthItems