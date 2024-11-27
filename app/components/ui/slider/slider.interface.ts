import { IMovie } from '@/shared/types/movie.types'

export interface ISlider extends Pick<IMovie, '_id' | 'bigPoster' | 'title'> {
	link: string,
	subtitle: string
}