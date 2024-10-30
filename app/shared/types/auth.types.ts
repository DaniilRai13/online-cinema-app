import { NextPage } from 'next'

export type TypeRole = {
	isOnlyAdmin?: boolean,
	isOnlyUser?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type NextPageAuth<P={}> = NextPage<P> & TypeRole

export type TypeComponentAuthFields = { Component: TypeRole }