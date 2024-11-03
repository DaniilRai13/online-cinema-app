'use client'

import Layout from '@/components/layout/Layout'
import { ILayout } from '@/components/screens/Home/Home.interface'
import { store } from '@/store/store'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import Progressbar from './HeadProvider/Progressbar'
import ReduxToast from './ReduxToast'
import AuthProvider from './AuthProvider/AuthProvider'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

const MainProvider: FC<ILayout & TypeComponentAuthFields> = ({ children, Component }) => {
	return (
		<Progressbar>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<AuthProvider Component={Component}>
						<Layout>
							{children}
						</Layout>
					</AuthProvider>
				</QueryClientProvider>
			</Provider>
		</Progressbar>
	)
}

export default MainProvider