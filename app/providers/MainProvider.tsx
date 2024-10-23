'use client'

import Layout from '@/components/layout/Layout'
import { ILayout } from '@/components/screens/Home/Home.interface'
import { store } from '@/store/store'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import Progressbar from './HeadProvider/Progressbar'
import ReduxToast from './ReduxToast'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

const MainProvider: FC<ILayout> = ({ children }) => {
	return (
		<Progressbar>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<ReduxToast />
					<Layout>
						{children}
					</Layout>
				</QueryClientProvider>
			</Provider>
		</Progressbar>
	)
}

export default MainProvider