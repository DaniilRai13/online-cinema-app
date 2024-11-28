import { IMovie } from '@/shared/types/movie.types'

export interface ISlide extends Pick<IMovie, '_id' | 'bigPoster' | 'title'> {
	link: string,
	subtitle: string
}