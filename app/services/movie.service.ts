import { IMovieEditInput } from '@/components/screens/Admin/Movies/movie-edit/movie-edit.interface'
import { getMoviesUrl } from '@/config/api.config'
import { IMovie } from '@/shared/types/movie.types'
import { axiosClassic } from 'api/interceptors'
import  axios  from 'api/interceptors'

export const MovieService = {
	async getMoviesBySearchTerm (searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
			params: searchTerm
				? {
					searchTerm
				}
				: {}
		})
	},
	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(getMoviesUrl('/most-popular'))

		return movies;
	},
	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},
	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},
	async create() {
		return axios.post<string>(getMoviesUrl('/'))
	},
	async delete(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	}
}