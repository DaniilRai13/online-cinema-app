export interface IUser {
	_id: string,
	email: string,
	password: string,
	createdAt: string,
	isAdmin: boolean
}

export interface IFavoriteMovie {
	movieId: string
}

export interface IUserInfo {
	_id: string,
	email: string,
	isAdmin: boolean,
	favorites: IFavoriteMovie[],
	createdAt: string
}