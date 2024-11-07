import UsersList from '@/components/screens/Admin/Users/UsersList'
import { NextPageAuth } from '@/shared/types/auth.types'

const UsersListPage: NextPageAuth = () => {
	return (
		<UsersList />
	)
}
UsersListPage.isOnlyAdmin = true

export default UsersListPage