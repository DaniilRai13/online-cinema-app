import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'

import { FC } from 'react'
import { useGenres } from './useGenres'

const GenresList: FC = () => {
	const { isLoading, handleSearch, searchTerm, data, deleteAsync } = useGenres()
	return (
		<Meta title='Users'>
			<AdminNavigation />
			<Heading title='Genres' />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable
				isLoading={isLoading}
				removeHandler={deleteAsync}
				headerItems={['Name', 'Slug']}
				tableItems={data || []} />
		</Meta>
	)
}

export default GenresList