import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { ActorsService } from '@/services/actors.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/adminTable.interface'
import { toastError } from '@/utils/toast-error'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(['actors list', debounceSearch], () => ActorsService.getAll(debounceSearch), {
		select: ({ data }) => data.map((actor): ITableItem => ({
			_id: actor._id,
			editUrl: getAdminUrl(`actor/edit/${actor._id}`),
			items: [actor.name, String(actor.countMovies)]
		})),
		onError: (error) => {
			toastError(error, 'Actors list')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation('delete actor', (userId: string) => ActorsService.deleteActors(userId), {
		onError: (error) => {
			toastError(error, 'Delete actor')
		},
		onSuccess: () => {
			toastr.success('Delete actor', 'delete was successful')
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