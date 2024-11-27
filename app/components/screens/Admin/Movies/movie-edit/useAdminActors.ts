import { IOption } from '@/components/ui/select/select.interface'
import { ActorService } from '@/services/actors.service'
import { toastError } from '@/utils/toast-error'
import { useQuery } from 'react-query'

export const useAdminActors = () => {
	const queryData = useQuery(['actor select'], () => ActorService.getAll(), {
		select: ({ data }) => data.map(
			(actor): IOption => ({
				label: actor.name,
				value: actor._id
			})
		),
		onError(error) {
			toastError(error, 'Select Actor')
		}
	})
	return queryData
}