import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { MovieService } from '@/services/movie.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import MovieList from './MovieList/MovieList'

const PopularMovies: FC = () => {
	const { isLoading, data: mostPopularMovies } = useQuery('Popular movies in sidebar', () => MovieService.getMostPopularMovies())

	return isLoading
		? <div>
			<SkeletonLoader count={3} className='h-28 mb-4' />
		</div>
		: <MovieList link='/trending' movies={mostPopularMovies || []} title='Popular Movies' />
}

export default PopularMovies