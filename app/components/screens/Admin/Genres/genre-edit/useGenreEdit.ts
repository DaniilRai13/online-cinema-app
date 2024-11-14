'use client'
import { getAdminUrl } from '@/config/url.config'
import { GenreService } from '@/services/genre.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { IGenreEditInput } from './genre-edit.interface'

const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { push } = useRouter()
	const params = useParams()

	const genreId = String(params?.id)

	const { isLoading } = useQuery(['genre edit', genreId], () => GenreService.getById(genreId), {
		onSuccess({ data }) {
			getKeys(data).forEach((key) => {
				setValue(key, data[key])
			})
		},
		onError(error) {
			toastError(error, 'Get genre')
		},
		enabled: !!genreId
	})

	const { mutateAsync: updateAsync } = useMutation('update genre', (data: IGenreEditInput) => GenreService.update(genreId, data), {
		onSuccess() {
			toastr.success('Update genre', 'update was success')
			push(getAdminUrl('genres'))
		},
		onError(error) {
			toastError(error, 'Update genre')
		},
	})

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data: IGenreEditInput) => updateAsync(data)

	return {
		isLoading,
		onSubmit
	}
}

export default useGenreEdit