'use client'

import { siteName, titleMerge } from '@/config/seo.config'
import Head from 'next/head'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { onlyText } from '../string/clearText'
import { ISeo } from './meta.interface'

import logoImage from '@/assets/images/logo.svg'

const Meta: FC<ISeo> = ({ title, description, image, children }) => {
	const pathname = usePathname()
	const currentUrl = `${process.env.APP_URL}${pathname}`
	console.log(title, description)
	return (
		<>
			{description ? (
				<Head>
					<title itemProp='headline'>{titleMerge(title)}</title>
					<meta
						itemProp='description'
						name='description'
						content={onlyText(description, 152)}
					/>
					<link rel='canonical' href={currentUrl} />
					<meta property='og:locale' content='en' />
					<meta property='og:title' content={titleMerge(title)} />
					<meta property='og:url' content={currentUrl} />
					<meta property='og:image' content={image || logoImage} />
					<meta property='og:site_name' content={siteName} />
					<meta
						property='og:description'
						content={onlyText(description, 197)}
					/>
				</Head>
			) : (
				<meta name='robots' />
			)}
			{children}
		</>

	)
}

export default Meta