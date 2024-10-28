import { AuthService } from '@/services/auth/auth.service'
import { toastError } from '@/utils/toast-error'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorCatch } from 'api/api.helper'
import { toastr } from 'react-redux-toastr'
import { IAuthResponse, IEmailPassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>('auth/register', async ({ email, password }, { rejectWithValue }) => {
	try {
		const res = await AuthService.register(email, password)
		toastr.success('Registration', 'Completed successfully')
		return res.data
	} catch (err) {
		toastError(err)
		return rejectWithValue(err)
	}
})


export const login = createAsyncThunk<IAuthResponse, IEmailPassword>('auth/login', async ({ email, password }, { rejectWithValue }) => {
	try {
		const res = await AuthService.register(email, password)
		toastr.success('Login', 'Completed successfully')
		return res.data
	} catch (err) {
		toastError(err)
		return rejectWithValue(err)
	}
})

export const logout = createAsyncThunk('auth/logout', () => {
	AuthService.logout()
})

export const checkAuth = createAsyncThunk<IAuthResponse, IEmailPassword>('auth/check-auth', async (_, thunkApi) => {
	try {
		const res = await AuthService.getNewTokens()
		return res.data
	} catch (error) {
		if (errorCatch(error) === 'jwt expired') {
			toastr.error(
				'Logout',
				'Your authorization is finished, plz sign in again!'
			)
			thunkApi.dispatch(logout())
		}
		return thunkApi.rejectWithValue(error)
	}
})