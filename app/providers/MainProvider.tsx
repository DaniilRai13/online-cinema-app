'use client'

import Layout from '@/components/layout/Layout'
import { ILayout } from '@/components/screens/Home/Home.interface'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false
		}
	}
})

const MainProvider: FC<ILayout> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Layout>
				{children}
			</Layout>
		</QueryClientProvider>
	)
}

export default MainProvider