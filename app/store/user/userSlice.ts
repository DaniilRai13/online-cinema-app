import { getStoreLocal } from '@/utils/local-storage'
import { createSlice } from '@reduxjs/toolkit'
import { checkAuth, login, logout, register } from './user.actions'

const initialState = {
	isLoading: false,
	user: getStoreLocal('user')
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(register.pending, state => {
			state.isLoading = true
		})
		builder.addCase(register.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
		})
		builder.addCase(register.rejected, state => {
			state.isLoading = false
			state.user = null
		})

		//LOGIN

		builder.addCase(login.pending, state => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
		})
		builder.addCase(login.rejected, state => {
			state.isLoading = false
			state.user = null
		})

		//LOGOUT 
		builder.addCase(logout.fulfilled, state => {
			state.isLoading = false
			state.user = null
		})

		//CHECK_AUTH

		builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.user = payload.user
		})
	}
})

export const userReducer = userSlice.reducer