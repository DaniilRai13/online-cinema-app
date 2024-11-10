import ActorsList from '@/components/screens/Admin/Actors/ActorsList'
import { NextPageAuth } from '@/shared/types/auth.types'

const ActorsPage: NextPageAuth = () => {
	return (
		<ActorsList />
	)
}
ActorsPage.isOnlyAdmin = true
export default ActorsPage