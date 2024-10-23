import { getMovieUrl } from '@/config/url.config'
import { IMovie } from '@/shared/types/movie.types'
import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import style from './SearchList.module.scss'

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {

	console.log(movies)
	return (
		<div className={style.list}>
			{movies.length
				?
				movies.map((movie) => (
					<Link key={movie._id} href={getMovieUrl(movie.slug)}>
						<a>
							<Image
								src={movie.poster}
								width={50}
								height={50}
								objectFit='cover'
								objectPosition='top'
								draggable={false}
								alt={movie.title}
							/>
						</a>
						<span>{movie.title}</span>
					</Link>)
				)
				: (<div className='text-white text-center my-4'>Movies not found</div>)}
		</div>
	)
}

export default SearchList