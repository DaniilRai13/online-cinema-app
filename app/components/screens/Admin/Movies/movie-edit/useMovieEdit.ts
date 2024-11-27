'use client'
import { getAdminUrl } from '@/config/url.config'
import { MovieService } from '@/services/movie.service'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { IMovieEditInput } from './movie-edit.interface'

const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { push } = useRouter()
	const params = useParams()

	const movieId = String(params?.id)

	const { isLoading } = useQuery(['movie edit', movieId], () => MovieService.getById(movieId), {
		onSuccess({ data }) {
			getKeys(data).forEach((key) => {
				setValue(key, data[key])
			})
		},
		onError(error) {
			toastError(error, 'Get movie')
		},
		enabled: !!movieId
	})

	const { mutateAsync: updateAsync } = useMutation('update movie', (data: IMovieEditInput) => MovieService.update(movieId, data), {
		onSuccess() {
			toastr.success('Update movie', 'update was success')
			push(getAdminUrl('movies'))
		},
		onError(error) {
			toastError(error, 'Update movie')
		},
	})

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data: IMovieEditInput) => updateAsync(data)

	return {
		isLoading,
		onSubmit
	}
}

export default useMovieEdit