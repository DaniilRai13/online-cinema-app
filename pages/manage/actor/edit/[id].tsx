import ActorEdit from '@/components/screens/Admin/Actors/actor-edit/ActorEdit'
import { NextPageAuth } from '@/shared/types/auth.types'
import React from 'react'

const ActorPage: NextPageAuth = () => {
	return (
		<ActorEdit />
	)
}
ActorPage.isOnlyAdmin = true
export default ActorPage