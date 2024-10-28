import { getAuthUrl } from '@/config/api.config'
import { IAuthResponse } from '@/store/user/user.interface'
import { axiosClassic } from 'api/interceptors'
import Cookies from 'js-cookie'
import { removeTokensStorage, saveToStorage } from './auth.helper'
import { getContentType } from 'api/api.helper'

export const AuthService = {
	// REGISTER
	async register(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/register'), { email, password })

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
	// LOGIN
	async login(email: string, password: string) {
		const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login'), { email, password })

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}
		return response
	},
	// LOGOUT
	logout() {
		removeTokensStorage()
		localStorage.remove('user')
	},
	// GET NEW TOKENS
	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')

		if (!refreshToken) {
			throw new Error('No refresh token available')
		}

		try {
			const response = await axiosClassic.post<IAuthResponse>(
				getAuthUrl('/login/access-token'),
				{ refreshToken },
				{headers: getContentType()}
			)

			if (response.data.accessToken) {
				saveToStorage(response.data)
			}

			return response
		} catch (error) {
			console.error('Error fetching new tokens:', error)
			throw new Error('Failed to refresh tokens')
		}
	}
}