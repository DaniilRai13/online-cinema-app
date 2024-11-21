import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { ActorService } from '@/services/actors.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/adminTable.interface'
import { toastError } from '@/utils/toast-error'
import { useRouter } from 'next/navigation'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)
	const {push} = useRouter()

	const queryData = useQuery(['actors list', debounceSearch], () => ActorService.getAll(debounceSearch), {
		select: ({ data }) => data.map((actor): ITableItem => ({
			_id: actor._id,
			editUrl: getAdminUrl(`actor/edit/${actor._id}`),
			items: [actor.name, String(actor.countMovies)]
		})),
		onError: (error) => {
			toastError(error, 'Actors list')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation('delete actor', (userId: string) => ActorService.delete(userId), {
		onError: (error) => {
			toastError(error, 'Delete actor')
		},
		onSuccess: () => {
			toastr.success('Delete actor', 'delete was successful')
			queryData.refetch()
		}
	})

	const { mutateAsync: createActor } = useMutation('create actor', () => ActorService.create(), {
		onError: (error) => {
			toastError(error, 'Create actor')
		},
		onSuccess: ({data: _id}) => {
			toastr.success('Create actor', 'create was successful')
			push(getAdminUrl(`actor/edit/${_id}`))
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
		createActor
	}), [queryData, searchTerm, deleteAsync, createActor]
	)
}