import MoviesList from '@/components/screens/Admin/Movies/MoviesList'
import { NextPageAuth } from '@/shared/types/auth.types'
import React from 'react'

const MoviesPage: NextPageAuth = () => {
	return (
		<MoviesList />
	)
}
MoviesPage.isOnlyAdmin = true
export default MoviesPage