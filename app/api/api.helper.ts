import { AxiosError, isAxiosError } from 'axios'

export interface IAxiosError {
	response?: {
		data?: AxiosError
	}
	message: string
}

export const errorCatch = (error: unknown): string => {
	if (isAxiosError(error)) {
		return error.response && error.response.data
			? typeof error.response.data.message === 'object'
				? error.response.data.message[0]
				: error.response.data.message
			: error.message
	}
	return 'An unexpected error occurred'
}

export const getContentType = () => ({
	'Content-Type': 'application/json',
})
