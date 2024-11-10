import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { GenreServices } from '@/services/genre.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/adminTable.interface'
import { toastError } from '@/utils/toast-error'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(['genres list', debounceSearch], () => GenreServices.getAll(debounceSearch), {
		select: ({ data }) => data.map((genre): ITableItem => ({
			_id: genre._id,
			editUrl: getAdminUrl(`genre/edit/${genre._id}`),
			items: [genre.name, genre.slug]
		})),
		onError: (error) => {
			toastError(error, 'Genres list')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation('delete genre', (genreId: string) => GenreServices.delete(genreId), {
		onError: (error) => {
			toastError(error, 'Delete genre')
		},
		onSuccess: () => {
			toastr.success('Delete genre', 'delete was successful')
			queryData.refetch()
		}
	})

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return useMemo(() => ({
		handleSearch,
		...queryData,
		searchTerm,
		deleteAsync
	}), [queryData, searchTerm, deleteAsync]
	)
}