import { reducer as toastrReducer } from 'react-redux-toastr'
import {userReducer} from './user/userSlice'

export const reducers = {
	toastr: toastrReducer,
	user: userReducer
}