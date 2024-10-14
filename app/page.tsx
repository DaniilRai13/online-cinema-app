'use client'

import MainProvider from 'providers/MainProvider'
import Home from './components/screens/Home/Home'
import './globals.scss'
export default function HomePage() {
	return (
		<MainProvider>
			<Home />
		</MainProvider>
	)
}
