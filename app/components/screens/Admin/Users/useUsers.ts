import { getAdminUrl } from '@/config/url.config'
import { useDebounce } from '@/hooks/useDebounce'
import { UserService } from '@/services/user.service'
import { ITableItem } from '@/ui/admin-table/AdminTable/adminTable.interface'
import { convertMongoDate } from '@/utils/date/convertMongoData'
import { toastError } from '@/utils/toast-error'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debounceSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(['users list', debounceSearch], () => UserService.getAll(debounceSearch), {
		select: ({ data }) => data.map((user): ITableItem => ({
			_id: user._id,
			editUrl: getAdminUrl(`user/edit/${user._id}`),
			items: [user.email, convertMongoDate(user.createdAt)]
		})),
		onError: (error) => {
			toastError(error, 'User list')
		}
	})

	const { mutateAsync: deleteAsync } = useMutation('delete user', (userId: string) => UserService.deleteUser(userId), {
		onError: (error) => {
			toastError(error, 'Delete user')
		},
		onSuccess: () => {
			toastr.success('Delete user', 'delete was successful')
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