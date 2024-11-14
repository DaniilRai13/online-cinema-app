import MovieEdit from '@/components/screens/Admin/Movies/movie-edit/MovieEdit'
import { NextPageAuth } from '@/shared/types/auth.types'

const MoviePage: NextPageAuth = () => {
	return (
		<MovieEdit />
	)
}
MoviePage.isOnlyAdmin = true
export default MoviePage