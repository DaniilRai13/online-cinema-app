import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'

import { FC } from 'react'
import { useActors} from './useActors'

const ActorsList: FC = () => {
	const { isLoading, handleSearch, searchTerm, data, deleteAsync } = useActors()
	return (
		<Meta title='Users'>
			<AdminNavigation />
			<Heading title='Users' />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable isLoading={isLoading} removeHandler={deleteAsync} headerItems={['Name', 'Count Movies']} tableItems={data || []} />
		</Meta>
	)
}

export default ActorsList