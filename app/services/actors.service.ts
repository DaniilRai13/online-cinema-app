import { getActorsUrl, getUsersUrl } from '@/config/api.config'
import { IActor } from '@/shared/types/movie.types'
import axios from 'api/interceptors'

export const ActorsService = {
	async getAll(searchTerm?: string) {
		return axios.get<IActor[]>(getActorsUrl(''), {
			params: searchTerm ? {
				searchTerm
			} : {}
		})
	},
	async deleteActors(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	}
}