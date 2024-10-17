import Link from 'next/link'
import { FC } from 'react'

import { getGenreUrl, getMovieUrl } from '@/config/url.config'
import { IMovie } from '@/shared/types/movie.types'

import { MaterialIcon } from '@/components/ui/MaterialIcon'
import { getGenresListEach } from '@/utils/movie/getGenresListEach'
import Image from 'next/image'
import styles from '../MovieList.module.scss'

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.item}>
			<Link href={getMovieUrl(movie.slug)} legacyBehavior>
				<a>
					<Image
						width={65}
						height={97}
						src={movie.poster}
						alt={movie.title}
						draggable={false}
						priority
					/>
				</a>
			</Link>
			<div className={styles.info}>
				<div className={styles.title}>{movie.title}</div>
				<div className={styles.genre}>
					{movie.genres.map((genre, index) => (
						<Link key={genre._id} href={getGenreUrl(genre.slug)} legacyBehavior>
							<a>
								{getGenresListEach(index, genre.name, movie.genres.length)}
							</a>
						</Link>
					))}
				</div>
				<div className={styles.rating}>
					<MaterialIcon name='MdStarRate' />
					<span>{movie.rating.toFixed(1)}</span>
				</div>
			</div>
		</div>
	)
}

export default MovieItem