import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { MovieService } from '@/services/movie.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/adminTable.interface'
import { getGenresList } from '@/utils/movie/getGenresListEach'
import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)
	const {push} = useRouter()

	const queryData = useQuery(['movies list', debounceSearch], () => MovieService.getMoviesBySearchTerm(debounceSearch), {
		select: ({ data }) => data.map((movie): ITableItem => ({
			_id: movie._id,
			editUrl: getAdminUrl(`movie/edit/${movie._id}`),
			items: [movie.title, getGenresList(movie.genres), String(movie.rating)]
		})),
		onError: (error) => {
			toastError(error, 'Movies list')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation('delete movie', (movieId: string) => MovieService.delete(movieId), {
		onError: (error) => {
			toastError(error, 'Delete movie')
		},
		onSuccess: () => {
			toastr.success('Delete movie', 'delete was successful')
			queryData.refetch()
		}
	})

	const { mutateAsync: createMovie } = useMutation('create movie', () => MovieService.create(), {
		onError: (error) => {
			toastError(error, 'Create movie')
		},
		onSuccess: ({data: _id}) => {
			toastr.success('Create movie', 'create was successful')
			push(getAdminUrl(`movie/edit/${_id}`))
		}
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return useMemo(() => ({
		handleSearch,
		...queryData,
		searchTerm,
		deleteAsync,
		createMovie
	}), [queryData, searchTerm, deleteAsync,createMovie]
	)
}