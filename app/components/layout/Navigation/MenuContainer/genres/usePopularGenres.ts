import { getGenreUrl } from '@/config/url.config'
import { GenreServices } from '@/services/genre.service'
import { useQuery } from 'react-query'
import { IMenuItem } from '../Menu/Menu.interface'

export const usePopularGenres = () => {
	const queryData = useQuery('popular genre menu', () => GenreServices.getAll(), {
		select: ({ data }) =>
			data
				.map(genre => ({
					icon: genre.icon,
					link: getGenreUrl(genre.slug),
					title: genre.name
				} as IMenuItem))
				.slice(0, 4)
	})
	return queryData
}