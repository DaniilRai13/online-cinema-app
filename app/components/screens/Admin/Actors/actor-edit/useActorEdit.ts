'use client'
import { getAdminUrl } from '@/config/url.config'
import { getKeys } from '@/utils/object/getKeys'
import { toastError } from '@/utils/toast-error'
import { useParams, useRouter } from 'next/navigation'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'
import { IActorEditInput } from './actor-edit.interface'
import { ActorService } from '@/services/actors.service'

const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { push } = useRouter()
	const params = useParams()

	const actorId = String(params?.id)

	const { isLoading } = useQuery(['actor edit', actorId], () => ActorService.getById(actorId), {
		onSuccess({ data }) {
			getKeys(data).forEach((key) => {
				setValue(key, data[key])
			})
		},
		onError(error) {
			toastError(error, 'Get actor')
		},
		enabled: !!actorId
	})

	const { mutateAsync: updateAsync } = useMutation('update actor', (data: IActorEditInput) => ActorService.update(actorId, data), {
		onSuccess() {
			toastr.success('Update actor', 'update was success')
			push(getAdminUrl('actors'))
		},
		onError(error) {
			toastError(error, 'Update actor')
		},
	})

	const onSubmit: SubmitHandler<IActorEditInput> = async (data: IActorEditInput) => updateAsync(data)

	return {
		isLoading,
		onSubmit
	}
}

export default useActorEdit