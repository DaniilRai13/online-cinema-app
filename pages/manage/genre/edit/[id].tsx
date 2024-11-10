import GenreEdit from '@/screens/Admin/Genres/genre-edit/GenreEdit'
import { NextPageAuth } from '@/shared/types/auth.types'

const GenreEditPage: NextPageAuth = () => {
	return (
		<GenreEdit />
	)
}
GenreEditPage.isOnlyAdmin = true
export default GenreEditPage