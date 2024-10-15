import { FC } from 'react'
import Menu from '../Menu/Menu'
import { usePopularGenres } from './usePopularGenres'

const GenreMenu: FC = () => {
	const { isLoading, data } = usePopularGenres()
	console.log(isLoading, data)
	return (
		isLoading
			? <div className='mx-11 mb-6'>Loading....</div>
			: <Menu menu={{ title: "Popular genres", items: data || [] }} />
	)
}

export default GenreMenu