import GenresList from '@/components/screens/Admin/Genres/GenresList'
import { NextPageAuth } from '@/shared/types/auth.types'

const GenresPage: NextPageAuth = () => {
	return (
		<GenresList />
	)
}
GenresPage.isOnlyAdmin = true
export default GenresPage