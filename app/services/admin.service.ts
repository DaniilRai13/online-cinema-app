import { getUsersUrl } from '@/config/api.config'
import { IUserInfo } from '@/shared/types/user.types'
import axios from 'api/interceptors'

export const AdminService = {
	async getCountUsers() {
		try {
			const resp = await axios.get<IUserInfo[]>(getUsersUrl(''))
			return resp.data.length
		} catch (err) {
			console.error(err)
		}

	}
}