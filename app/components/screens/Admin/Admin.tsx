import Heading from '@/components/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import Statistics from './Statistics/Statistics'
import AdminNavigation from '@/components/ui/admin-navigation/AdminNavigation'

const Admin: FC = () => {
	return (
		<Meta title='Admin panel'>
			<AdminNavigation />
			<Heading title='Some Statistics' />
			<Statistics />
		</Meta>
	)
}

export default Admin