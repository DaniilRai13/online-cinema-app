import { IMovie } from '@/shared/types/movie.types'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IMovieEditInput extends Omit<IMovie, '_id'>{}