import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './rootReducers'

export const store = configureStore({
	reducer: reducers
})

export type TypeRootState = ReturnType<typeof store.getState>