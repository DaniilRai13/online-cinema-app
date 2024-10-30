import { API_URL } from '@/config/api.config'
// import { AuthService } from '@/services/auth/auth.service'
import axios from 'axios'
import Cookies from 'js-cookie'
import { getContentType } from './api.helper'
// import { removeTokensStorage } from '@/services/auth/auth.helper'

export const axiosClassic = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

const instance = axios.create({
	baseURL: API_URL,
	headers: getContentType()
})

instance.interceptors.request.use((config) => {
	const accessToken = Cookies.get('accessToken')

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

export default instance