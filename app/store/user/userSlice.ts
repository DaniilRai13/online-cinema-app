import { getStoreLocal } from '@/utils/local-storage'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isLoading: false,
	user: getStoreLocal('user')
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {

	}
})

export const userReducer = userSlice.reducer