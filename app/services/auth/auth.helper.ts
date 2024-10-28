import { IAuthResponse } from '@/store/user/user.interface'
import Cookies from 'js-cookie'

export const saveTokensStorage = (data: IAuthResponse) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
}
export const saveToStorage = (data: IAuthResponse) => {
	saveTokensStorage(data)
	localStorage.setItem('user', JSON.stringify(data))
}
export const removeTokensStorage = () => {
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}