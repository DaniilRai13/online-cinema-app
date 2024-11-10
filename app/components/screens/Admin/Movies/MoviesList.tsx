import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'
import Meta from '@/utils/meta/Meta'

import { FC } from 'react'
import { useMovies } from './useMovies'

const MoviesList: FC = () => {
	const { isLoading, handleSearch, searchTerm, data, deleteAsync } = useMovies()
	return (
		<Meta title='Users'>
			<AdminNavigation />
			<Heading title='Users' />
			<AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />
			<AdminTable isLoading={isLoading} removeHandler={deleteAsync} headerItems={['Title', 'Genres', 'Rating']} tableItems={data || []} />
		</Meta>
	)
}

export default MoviesList